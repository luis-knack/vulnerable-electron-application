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
function remoteExported(){
    ipcRenderer.send('open-remoteExported');
}
function changeNodeInt(){
    ipcRenderer.send('change-nodeInt');
}
function changeSandboxBypassSop(){
    ipcRenderer.send('change-SDB_SOP');
}
function changeOpenExternalValidation(){
    ipcRenderer.send('change-OEV');
}
function changeBypassValidationJavaScript(){
    ipcRenderer.send('change-BPVJS');
}

window.bypassNodeIntegrationByPreload=bypassNodeIntegrationByPreload
window.callNodeIntegrationRCE=callNodeIntegrationRCE
window.callOpenExternalValidation=callOpenExternalValidation
window.callOpenExternalNoValidation=callOpenExternalNoValidation
window.callBypassValidacaoJS=callBypassValidacaoJS
window.sandboxDisabledBypassSOP=sandboxDisabledBypassSOP
window.remoteExported=remoteExported
window.changeNodeInt=changeNodeInt
window.changeSandboxBypassSop=changeSandboxBypassSop
window.changeOpenExternalValidation=changeOpenExternalValidation
window.changeBypassValidationJavaScript=changeBypassValidationJavaScript