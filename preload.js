const preloadText="Access To Preload"

var nativos = {
    modulosNativos:require('child_process'),
}

// window.nativos=nativos;
// window.preloadText=preloadText;
process.once('loaded', function(){
    // global.app_preload=require('electron').remote.app
    global.nativos=nativos;
    global.preloadText=preloadText;
})