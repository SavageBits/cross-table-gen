var gulp = require('gulp');
var typescript = require('gulp-typescript');
var fs = require('fs');
var open = require('gulp-open');
var connect = require('gulp-connect');
require('babel-polyfill');

var config = {  
  port: 9008,
  devBaseUrl: 'http://localhost',  
  paths: {
    rootDirectory: '.',
    html: './index.html',
    ts: './app/src/*.ts',
    tsConfig: './tsconfig.json',
    distDirectory: './app/dist'
  }
}

gulp.task('open', ['connect'], function() {
  gulp.src('')
    .pipe(open({
      app: 'chrome',
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

gulp.task('ts', function() {
  var tsConfig = JSON.parse(fs.readFileSync(config.paths.tsConfig,'utf8'));     
    
  gulp.src(config.paths.ts)
    .pipe(typescript(tsConfig.compilerOptions))
    .pipe(gulp.dest(config.paths.distDirectory))
    .pipe(connect.reload());     
});

gulp.task('watch', function() {
  gulp.watch(config.paths.ts, ['ts']);
});

gulp.task('default', ['ts', 'open']);