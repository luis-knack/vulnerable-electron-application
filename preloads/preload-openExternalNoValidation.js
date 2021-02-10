const { ipcRenderer } = require('electron');

function funcOpenExternal(url) {
    console.log('teste')
    return ipcRenderer.send('open-external', url)
}

window.funcOpenExternal=funcOpenExternal;