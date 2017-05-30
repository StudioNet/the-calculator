module.exports = function (rootFolder) {
    let self = this;
    let root = rootFolder || '';
    let index = root + '/index.html';
    let app = root + "/app/";
    let assets = root + "/assets/";
    let dist = root + '/build/';

    self.assets = {
        css: assets + 'css/**/*.css',
        images: assets + 'imgs/**/*.{jpg,png,gif}',
        fonts: assets + 'fonts/**/*.{ttf,woff,eot,svg,woff2}'
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
        assets: {
            css: dist + 'assets/css/',
            fonts: dist + 'assets/fonts/'
        }
    };

    return self;
}