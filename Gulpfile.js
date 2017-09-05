var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({ script : './index.js', ext : 'js' });
});


/*
let elixir = require('laravel-elixir');

elixir(function(mix) {

    Elixir.webpack.mergeConfig({
        babel: {
            presets: ['react','es2015']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }
            ]
        }
    });
    mix.webpack("index.js","dist.js",".");
});*/

