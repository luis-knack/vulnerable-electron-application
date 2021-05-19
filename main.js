const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');

//NodeIntegrationEnabled
var NIE_node_integration=true;
//SandboxDisabledBypassSOP
var SDB_sandbox=false;
//openExternalValidation
var OEV_context_isolation=false;
var OEV_preload = 'preload-openExternalValidation.js'
//bypassValidacaoJavaScript
var BPVJS_context_isolation=false;
var BPVJS_preload = 'preload-bypassValidacao.js'
//bypassNodeIntegrationByPreload
var BPNIP_sandbox=false;

let mainWindow;
let browserwind;

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        webPreferences:{
            enableRemoteModule: true,
            contextIsolation: false,
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
            contextIsolation: false,
            sandbox:false,
            nodeIntegration: NIE_node_integration,
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
            contextIsolation: false,
            sandbox: SDB_sandbox,
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
            contextIsolation: OEV_context_isolation,
            sandbox: true,
            preload: path.join(app.getAppPath(), 'preloads/'+OEV_preload)
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
function bypassValidacaoJavaScript(){

    browserwind = new BrowserWindow({
        title:'Bypass Validacao Java Script',
        webPreferences:{
            contextIsolation: BPVJS_context_isolation,
            preload: path.join(__dirname, 'preloads/'+BPVJS_preload)
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
            contextIsolation: false,
            nodeIntegration: false,
            sandbox: BPNIP_sandbox,
            preload: path.join(__dirname, 'preloads/preload-bypassNode.js')
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

ipcMain.on('change-nodeInt', function(){
    NIE_node_integration = changeBooleans(NIE_node_integration);
});
ipcMain.on('change-SDB_SOP', function(){
    SDB_sandbox=changeBooleans(SDB_sandbox);
});
ipcMain.on('change-BPNIP', function(){
    BPNIP_sandbox=changeBooleans(BPNIP_sandbox);
});
ipcMain.on('change-OEV', function(){
    OEV_context_isolation=changeBooleans(OEV_context_isolation);
    if(OEV_context_isolation===false){
        OEV_preload='preload-openExternalValidation.js'
    }
    else{
        OEV_preload='preload-openExternalValidation-FIX.js'
    }
});
ipcMain.on('change-BPVJS', function(){
    BPVJS_context_isolation=changeBooleans(BPVJS_context_isolation);
    if(BPVJS_context_isolation===false){
        BPVJS_preload='preload-bypassValidacao.js'
    }
    else{
        BPVJS_preload='preload-bypassValidacao-FIX.js'
    }
});

function changeBooleans(param){
    if(param===true){
        return false;
    }
    return true;
}

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