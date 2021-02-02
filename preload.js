// const { ipcRenderer } = require("electron");
const preloadText="Access To Preload"

// var IPCWhitelist=[
//     'log-debug',
//     'log-info',
//     'log-warn',
//     'log-error'
// ]

// function sendIPCRequestSync(ipc){

//     var arg = [];

//     for(var i=1; i<arguments.length;i++){
//         arg[i-1]=arguments[i];
//     }
//     if(!IPCWhitelist.includes(ipc)){
//         throw new Error();
//     }

//     return ipcRenderer.sendSync.apply(ipcRenderer, [ipc].concat(arg));
// }
// window.sendIPCRequestSync=sendIPCRequestSync;

var nativos = {
    modulosNativos:require('child_process'),
}

process.once('loaded', function(){
    // global.app_preload=require('electron').remote.app
    global.nativos=nativos;
    global.preloadText=preloadText;
})