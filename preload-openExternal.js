const {shell} = require('electron');

function funcOpenExternal(arg) {

    if(arg.substr(0,8)==="https://" || arg.substr(0,7)==="http://"){
        return shell.openExternal(arg);
    }
    throw new Error();   
}

window.funcOpenExternal=funcOpenExternal;