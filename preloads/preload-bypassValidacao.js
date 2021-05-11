var allowlist = [
    'https://www.safe.com',
];

window.preloadAPI={

    accessSite(arg){

        if(allowlist.includes(arg)){
            return "bypass"
        }
        return "failed"
    }

}