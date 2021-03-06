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
        root: root,
        app: app,
        code: {
            libs: [
                './js/jquery.min.js',
                './js/bootstrap.min.js',
                './node_modules/angular/angular.js',
                './node_modules/@reactivex/rxjs/dist/global/Rx.js',
                '!./js/ex.js',
                '!./js/npm.js',
                '!./js/bootstrap.js'
            ],
            appjs: [
                    app + '**/*.js', 
                    app + '/app.js'
            ],
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