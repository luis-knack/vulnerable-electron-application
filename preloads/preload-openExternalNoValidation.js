const { ipcRenderer } = require('electron');

function funcOpenExternal(url) {
    return ipcRenderer.send('open-external', url)
}

window.funcOpenExternal=funcOpenExternal;