const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// File paths
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// Compilar .scss a .css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
        ); // put final CSS in dist folder
}

// Concatena, minifica y convierte a script.js
function jsTask() {
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
        );
}

// Cachebust
var cbString = new Date().getTime();
function cacheBustTask() {
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}


exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
);