const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');

//NodeIntegrationEnabled
var NIE_node_integration=true;
//SandboxDisabledBypassSOP
var SDB_sandbox=false;
//openExternalValidation
var OEV_context_isolation=false;
//bypassValidacaoJavaScript
var BPVJS_context_isolation=false;

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


// function getMapWebPreferences(){

//     var mapWebPreferences = new Map();

//     mapWebPreferences.set('bypassSopSandboxDisabled', returnPocsMapsReset("bypassSopSandboxDisabled"));
//     mapWebPreferences.set('bypassValidacao', returnPocsMapsReset("bypassValidacao"));
//     mapWebPreferences.set('nodeIntegrationEnabled', returnPocsMapsReset("nodeIntegrationEnabled"));

//     return mapWebPreferences;
// };

// function returnPocsMapsReset(poc){

//     var map=new Map();

//     if(poc==="bypassSopSandboxDisabled"){
//         map.set("node_integration",false);
//         map.set("sandbox_",false);
//         map.set("context_isolation",false);
//         return map;
//     }
//     else if (poc==="bypassValidacao"){
//         map.set("node_integration",false);
//         map.set("sandbox_",false);
//         map.set("context_isolation",false);
//         return map;
//     }
//     else if(poc==="nodeIntegrationEnabled"){
//         map.set("node_integration",true);
//         map.set("sandbox_",false);
//         map.set("context_isolation",false);
//         return map;
//     }

// }

// function setPocConfigsFix(arrayConfigs){
//     arrayConfigs.forEach(function (item, indice, array) {
//         console.log("item: "+item+", indice: "+indice)
//         if(indice === "node_integration"){
//             node_integration=item;
//         }
//         else if(indice === "sandbox_"){
//             sandbox_=item;
//         }
//         else if(indice === "context_isolation"){
//             context_isolation=item;
//         }
//     });
// }
// function setPocConfigsReset(arrayConfigs){
//     arrayConfigs.forEach(function (item, indice, array) {

//         var config;

//         if(item==true){
//             config = false;
//         }else{
//             config = true;
//         }

//         if(indice === "node_integration"){
//             node_integration=config;
//         }
//         else if(indice === "sandbox_"){
//             sandbox_=config;
//         }
//         else if(indice === "context_isolation"){
//             context_isolation=config;
//         }
//     });
// }

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
function bypassValidacaoJavaScript(){

    browserwind = new BrowserWindow({
        title:'Bypass Validacao Java Script',
        webPreferences:{
            contextIsolation: BPVJS_context_isolation,
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
            contextIsolation: false,
            nodeIntegration: false,
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
ipcMain.on('change-OEV', function(){
    OEV_context_isolation=changeBooleans(OEV_context_isolation);
});
ipcMain.on('change-BPVJS', function(){
    BPVJS_context_isolation=changeBooleans(BPVJS_context_isolation);
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