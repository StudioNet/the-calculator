module.exports = function (rootFolder) {
    var self = this;

    let root = rootFolder || '';
    let index = root + '/index.html';
    let app = root + "/app/";
    let assets = root + "/assets/";
    let dist = root + '/build/';

    self.assets = {
        css: assets + 'css/',
        images: assets + 'imgs/',
        fonts: assets + 'fonts/'
    };

    self.index = index;

    self.src = {
        app: app,
        code: {
            libs: './js/**/*.js',
            appjs: app + '**/*.js',
            sass: app + '**/*.scss'
        }
    };

    self.build = {
        path: dist,
        app: dist + 'app/',
        libs: dist + 'libs/',
        assets: dist + 'assets/'
    };

    return self;
}