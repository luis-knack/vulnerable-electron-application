const {ipcRenderer} = require('electron')

function callNodeIntegrationRCE(){
    ipcRenderer.send('open-nodeIntegrationRce')
}
function callOpenExternal(){
    ipcRenderer.send('open-openExternal')
}
function bypassNodeIntegrationByPreload(){
    ipcRenderer.send('open-bypassNodeByPreload')
}
function callBypassValidacaoJS(){
    ipcRenderer.send('open-bypassValidacaoJS')
}
function sandboxDisabledBypassSOP(){
    ipcRenderer.send('open-bypasssop');
}


window.bypassNodeIntegrationByPreload=bypassNodeIntegrationByPreload
window.callNodeIntegrationRCE=callNodeIntegrationRCE
window.callOpenExternal=callOpenExternal
window.callBypassValidacaoJS=callBypassValidacaoJS
window.sandboxDisabledBypassSOP=sandboxDisabledBypassSOP