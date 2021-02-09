const preloadText="Access To Preload"

var nativos = {
    sub_processo:require('child_process'),
}

window.nativos=nativos;
window.preloadText=preloadText;

// process.once('loaded', function(){
//     global.nativos=nativos;
//     global.preloadText=preloadText;
// })
