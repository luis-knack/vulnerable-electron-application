const { ipcRenderer } = require('electron');

function funcOpenExternal(url) {
    ipcRenderer.send('open-external', url)
}

window.funcOpenExternal=funcOpenExternal;