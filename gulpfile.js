var gulp = require('gulp');
var typescript = require('gulp-typescript');
var fs = require('fs');
var open = require('gulp-open');
var connect = require('gulp-connect');
var os = require('os');
require('babel-polyfill');

var config = {  
  port: 9009,
  devBaseUrl: 'http://localhost',  
  paths: {
    rootDirectory: '.',
    html: './index.html',
    css: './assets/styles/*.css',
    ts: './app/src/*.ts',
    tsConfig: './tsconfig.json',
    distDirectory: './app/dist'
  },
  browser: os.platform() === 'win32' ? 'chrome' : 'google chrome'
}

gulp.task('open', ['connect'], function() {
  gulp.src('')
    .pipe(open({
      app: config.browser,
      uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

gulp.task('connect', function() {
  connect.server({
    root: [config.paths.rootDirectory],
    port: config.port,
    base: config.devBaseUrl,
    fallback: 'index.html',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(connect.reload());
});

gulp.task('ts', function() {
  var tsConfig = JSON.parse(fs.readFileSync(config.paths.tsConfig,'utf8'));     
    
  gulp.src(config.paths.ts)
    .pipe(typescript(tsConfig.compilerOptions))
    .pipe(gulp.dest(config.paths.distDirectory))
    .pipe(connect.reload());     
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.css, ['css']);
  gulp.watch(config.paths.ts, ['ts']);
});

gulp.task('default', ['ts', 'open', 'watch']);