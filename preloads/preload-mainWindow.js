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
    ipcRenderer.send('open-bypassSop');
}
function bypassSandbox(){
    ipcRenderer.send('open-bypassSandbox');
}

function changeNodeInt(){
    ipcRenderer.send('change-nodeInt');
}


window.bypassNodeIntegrationByPreload=bypassNodeIntegrationByPreload
window.callNodeIntegrationRCE=callNodeIntegrationRCE
window.callOpenExternal=callOpenExternal
window.callBypassValidacaoJS=callBypassValidacaoJS
window.sandboxDisabledBypassSOP=sandboxDisabledBypassSOP
window.bypassSandbox=bypassSandbox
window.changeNodeInt=changeNodeInt