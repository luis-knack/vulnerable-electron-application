const { ipcRenderer } = require('electron');

function funcOpenExternal(url) {

    if(url.substr(0,8)==="https://" || url.substr(0,7)==="http://"){

        return ipcRenderer.send('open-external', url)
        
    }
    throw new Error();   
}

window.funcOpenExternal=funcOpenExternal;