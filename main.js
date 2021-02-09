// const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');

let mainWindow;
let browserwind;

// Listen for app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), 'preloads/preload-mainWindow.js')
        }
    });
    //Load html into window
    mainWindow.loadFile('web-pages/mainWindow.html');
    //Quit app when closed
    mainWindow.on('close', function(){
        app.quit();
    }); 

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);

});

//Handle create add window
function createAddWindow(){

    //Create new window
    browserwind = new BrowserWindow({
        width:300,
        height:200,
        title:'Add Shopping List Item',
        webPreferences:{
            nodeIntegration: true
        }
    });

    //Load html into window
    browserwind.loadFile('web-pages/browserwind.html');
    //Garbage collenction handle
    browserwind.on('close', function(){
        browserwind=null;
    });
}

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
    browserwind.loadFile('web-pages/nodeIntegrationRce.html');
    
    //Garbage collenction handle
    browserwind.on('close', function(){
        browserwind=null;
    });

}

function sandboxDisabledBypassSOP(){

    browserwind = new BrowserWindow({
        title:'Sandbox Disabled',
        webPreferences:{
            sandbox: false,
        }
    });
    browserwind.loadFile('web-pages/bypassSopSandboxDisabled.html');

    //Garbage collenction handle
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
            preload: path.join(app.getAppPath(), 'preloads/preload-openExternal.js')
        }
    });

    browserwind.loadFile('web-pages/openExternal.html');
    
    //Garbage collenction handle
    browserwind.on('close', function(){
        browserwind=null;
    });

}
function contextIsolationDisabled(){

    browserwind = new BrowserWindow({
        title:'Context Isolation Disabled',
        webPreferences:{
            nodeIntegration: true,
            // sandbox: true,
            preload: path.join(__dirname, 'preloads/preload-sandbox.js')
        }
    });

    browserwind.loadFile('web-pages/nodeIntegrationRce.html');
    
    //Garbage collenction handle
    browserwind.on('close', function(){
        browserwind=null;
    });

}
function bypassValidacaoJavaScript(){

    browserwind = new BrowserWindow({
        title:'Bypass Validacao Java Script',
        webPreferences:{
            preload: path.join(__dirname, 'preloads/preload-bypass-validacao.js')
        }
    });

    browserwind.loadFile('web-pages/bypassValidacao.html');
    
    //Garbage collenction handle
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

    browserwind.loadFile('web-pages/nodeIntegrationRce.html');
    
    //Garbage collenction handle
    browserwind.on('close', function(){
        browserwind=null;
    });

}
//Catch open-external
ipcMain.on('nativos-aplicacao', function(event, arg){

    nativos={
        modulosNativos:require('child_process'),
    }
    browserwind.webContents.send('nativos-aplicacao', nativos)
    
});
//Catch open-external
ipcMain.on('open-external', function(e, url){
    shell.openExternal(url)
});

ipcMain.on('open-nodeIntegrationRce', function(event, arg){
    nodeIntegrationEnabled();
});
ipcMain.on('open-openExternal', function(event, arg){
    openExternalValidation();
})
ipcMain.on('open-contextIsolationDisabled', function(event, arg){
    contextIsolationDisabled();
})
ipcMain.on('open-bypassValidacaoJS', function(event, arg){
    bypassValidacaoJavaScript();
})
ipcMain.on('open-bypasssop', function(event, arg){
    sandboxDisabledBypassSOP();
})
ipcMain.on('open-bypassNodeByPreload', function(event, arg){
    bypassNodeIntegrationByPreload();
})
//Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:"Add Item",
                click(){
                    createAddWindow();
                }
            },
            {
                label:"Node Integration Enabled",
                accelerator: process.plataform == 'darwin' ? 'Command+1' : 'Ctrl+1',
                click(){
                    nodeIntegrationEnabled();
                }
            },
            {
                label:"Sandbox Disabled Bypass SOP",
                accelerator: process.plataform == 'darwin' ? 'Command+2' : 'Ctrl+2',
                click(){
                    sandboxDisabledBypassSOP();         
                }
            },
            {
                label:"Open External Validation",
                accelerator: process.plataform == 'darwin' ? 'Command+3' : 'Ctrl+3',
                click(){
                    openExternalValidation();
                }
            },
            {
                label:"Context Isolation Enabled",
                accelerator: process.plataform == 'darwin' ? 'Command+4' : 'Ctrl+4',
                click(){
                    contextIsolationDisabled();
                }
            },
            {
                label:"Bypass JavaScript Validation",
                accelerator: process.plataform == 'darwin' ? 'Command+5' : 'Ctrl+5',
                click(){
                    bypassValidacaoJavaScript();
                }
            },
            // {
            //     label:"Clear Items"
            // },
            {
                label:"Quit",
                accelerator: process.plataform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


// If mac, add empty object
if(process.plataform == 'darwin'){
    //add {} to the array's beginning
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in prod
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