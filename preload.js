var nativos = {
    sub_processo:require('child_process'),
    erro:require('error'),
    inspetor:require('inspector')
}

window.nativos=nativos;







const preloadText="Access To Preload"
// window.preloadText=preloadText;
process.once('loaded', function(){
    // global.app_preload=require('electron').remote.app
    global.nativos=nativos;
    global.preloadText=preloadText;
})
