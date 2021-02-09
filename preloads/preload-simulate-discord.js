const {ipcRenderer} = require('electron')
var requireAllowList = [
    'readline',
    'stream',
];

function returnRequire(arg) {
    if(requireAllowList.includes(arg)){
        return  require('electron').remote.app;
    }
    throw new Error();   
}

window.returnRequire = returnRequire;
window.custom_app = ipcRenderer.sendSync('ELECTRON_BROWSER_GET_BUILTIN', 'app') ;