const {ipcRenderer} = require('electron')

function callNodeIntegrationRCE(){
    ipcRenderer.send('open-nodeIntegrationRce')
}
function callOpenExternal(){
    ipcRenderer.send('open-openExternal')
}
function callContextIsolationDisabled(){
    ipcRenderer.send('open-contextIsolationDisabled')
}
function callBypassValidacaoJS(){
    ipcRenderer.send('open-bypassValidacaoJS')
}


window.callContextIsolationDisabled=callContextIsolationDisabled
window.callNodeIntegrationRCE=callNodeIntegrationRCE
window.callOpenExternal=callOpenExternal
window.callBypassValidacaoJS=callBypassValidacaoJS