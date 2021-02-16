const {ipcRenderer} = require('electron')

function callNodeIntegrationRCE(){
    ipcRenderer.send('open-nodeIntegrationRce')
}
function callOpenExternalValidation(){
    ipcRenderer.send('open-openExternalValidation')
}
function callOpenExternalNoValidation(){
    ipcRenderer.send('open-openExternalNoValidation')
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
function remoteExported(){
    ipcRenderer.send('open-remoteExported');
}
// function changeNodeInt(){
//     ipcRenderer.send('change-nodeInt');
// }

window.bypassNodeIntegrationByPreload=bypassNodeIntegrationByPreload
window.callNodeIntegrationRCE=callNodeIntegrationRCE
window.callOpenExternalValidation=callOpenExternalValidation
window.callOpenExternalNoValidation=callOpenExternalNoValidation
window.callBypassValidacaoJS=callBypassValidacaoJS
window.sandboxDisabledBypassSOP=sandboxDisabledBypassSOP
window.bypassSandbox=bypassSandbox
window.remoteExported=remoteExported
// window.changeNodeInt=changeNodeInt