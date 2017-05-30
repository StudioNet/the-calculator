module.export = function (rootFolder) {
    let root    = rootFolder || '';
    let src     = root + "src/";
    let assets  = root + "assets/";

    let assetsPath = {
        css: assets + 'css/',
        images: assets + 'imgs/'
    } 

    let index = root + 'index.html';
    let code = {
        ts: app + '**/*.ts',
        js: app + '**/*.js'
    }

    let dist = 'build/';
    let build = {
        path: dist, 
        app: dist + 'app/'
    }
}