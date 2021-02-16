const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');

// var node_int=true;

let mainWindow;
let browserwind;

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        webPreferences:{
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), 'preloads/preload-mainWindow.js')
        }
    });
    
    mainWindow.loadFile('web-pages/mainWindow.html');

    mainWindow.on('close', function(){
        app.quit();
    }); 

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

});

// payload
// <script> require('child_process').execFile('gnome-calculator',function(){})</script>
// <script> require('child_process').exec('gnome-calculator')</script>

function nodeIntegrationEnabled(){
    browserwind = new BrowserWindow({
        title:'Node Integration Enabled',
        webPreferences:{
            nodeIntegration: true
        }
    });
    browserwind.loadFile('web-pages/domXSS.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}

//payload
//<script>const wind=window.open('https://www.tempest.com.br');wind.eval("alert(document.domain)");</script>
function sandboxDisabledBypassSOP(){

    browserwind = new BrowserWindow({
        title:'Sandbox Disabled',
        webPreferences:{
            sandbox: false,
        }
    });
    browserwind.loadFile('web-pages/domXSS.html');

    browserwind.on('close', function(){
        browserwind=null;
    });

}

function openExternalValidation(){

    browserwind = new BrowserWindow({
        title:'Open External Validation',
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: false,
            sandbox: true,
            preload: path.join(app.getAppPath(), 'preloads/preload-openExternalValidation.js')
        }
    });

    browserwind.loadFile('web-pages/openExternalValidation.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}

function openExternalNoValidation(){

    browserwind = new BrowserWindow({
        title:'Open External No Validation',
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: false,
            sandbox: true,
            preload: path.join(app.getAppPath(),'preloads/preload-openExternalNoValidation.js')
        }
    });

    browserwind.loadFile('web-pages/openExternalNoValidation.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}

function contextIsolationDisabled(){

    browserwind = new BrowserWindow({
        title:'Context Isolation Disabled',
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname, 'preloads/preload-sandbox.js')
        }
    });

    browserwind.loadFile('web-pages/domXSS.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}
function bypassValidacaoJavaScript(){

    browserwind = new BrowserWindow({
        title:'Bypass Validacao Java Script',
        webPreferences:{
            preload: path.join(__dirname, 'preloads/preload-bypassValidacao.js')
        }
    });

    browserwind.loadFile('web-pages/bypassValidacao.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}
function bypassNodeIntegrationByPreload(){

    browserwind = new BrowserWindow({
        title:'Bypass Node Integratin By Preload',
        webPreferences:{
            nodeIntegration: false,
            preload: path.join(__dirname, 'preloads/preload-bypassNode.js')
        }
    });

    browserwind.loadFile('web-pages/domXSS.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}
function bypassSandbox(){

    browserwind = new BrowserWindow({
        title:'Bypass Sandbox',
        webPreferences:{
            sandbox: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preloads/preload-bypassSandbox.js')
        }
    });

    browserwind.loadFile('web-pages/bypassSandbox.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}

function remoteExportedRCE(){
    browserwind = new BrowserWindow({
        title:'Remote Module Exported RCE',
        webPreferences:{
            enableRemoteModule: true,
            nodeIntegration: false,
            sandbox: true,
            preload: path.join(app.getAppPath(), 
            'preloads/preload-remoteExported.js'),
        }
    });
    browserwind.loadFile('web-pages/domXSS.html');
    
    browserwind.on('close', function(){
        browserwind=null;
    });

}

ipcMain.on('open-external', function(e, url){
    shell.openExternal(url);
});

ipcMain.on('open-nodeIntegrationRce', function(event, arg){
    nodeIntegrationEnabled();
});
ipcMain.on('open-openExternalValidation', function(event, arg){
    openExternalValidation();
});
ipcMain.on('open-openExternalNoValidation', function(event, arg){
    openExternalNoValidation();
});
ipcMain.on('open-contextIsolationDisabled', function(event, arg){
    contextIsolationDisabled();
});
ipcMain.on('open-bypassValidacaoJS', function(event, arg){
    bypassValidacaoJavaScript();
});
ipcMain.on('open-bypassSop', function(event, arg){
    sandboxDisabledBypassSOP();
});
ipcMain.on('open-bypassNodeByPreload', function(event, arg){
    bypassNodeIntegrationByPreload();
});
ipcMain.on('open-bypassSandbox', function(event, arg){
    bypassSandbox();
});
ipcMain.on('open-remoteExported', function(){
    remoteExportedRCE();
});

// ipcMain.on('change-nodeInt', function(){
//     if(node_int){
//         node_int=false;
//     }else{
//         node_int=true;
//     }
// })

const mainMenuTemplate = [];

if(process.plataform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Dev Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.plataform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}