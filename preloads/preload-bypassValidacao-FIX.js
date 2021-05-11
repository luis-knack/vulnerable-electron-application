const {contextBridge} = require('electron')

var allowlist = [
    'https://www.safe.com',
];

contextBridge.exposeInMainWorld('preloadAPI',{
    accessSite: (arg) =>{
        if(allowlist.includes(arg)){
            return "bypass"
        }
        return "failed"
    }
})