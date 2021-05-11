const { ipcRenderer } = require('electron');

window.preloadAPI ={
    funcOpenExternal(url) {

        if(url.substr(0,8)==="https://" || url.substr(0,7)==="http://"){
    
            ipcRenderer.send('open-external', url);
            return
    
        }
        throw new Error();   
    }
}