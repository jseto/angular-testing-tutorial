'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var del = require('del');

gulp.task('clean', [ 'clean:coverage' ]);

gulp.task('clean:coverage', function(done){
	del( [ path.coverage + '**'], done );
});
