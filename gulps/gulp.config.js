module.export = function (rootFolder) {
    let root = rootFolder || '';
    let app = root + "app/";
    let assets = root + "assets/";

    let assetsPath = {
        css: assets + 'css/',
        images: assets + 'imgs/',
        fonts: assets + 'fonts/'
    }

    let index = root + 'index.html';
    let code = {
        js: app + '**/*.js',
        sass: app + '**/*.scss'
    }

    let dist = 'build/';
    let build = {
        path: dist,
        app: dist + 'app/'
    }
}