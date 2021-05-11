var allowlist = [
    'https://www.safe.com',
];

// function accessSite(arg){

//     if(allowlist.includes(arg)){
//         return "bypass"
//     }
//     return "failed"
// }

// window.accessSite=accessSite

window.preloadAPI={

    accessSite(arg){

        if(allowlist.includes(arg)){
            return "bypass"
        }
        return "failed"
    }

}