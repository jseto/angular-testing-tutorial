'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var runSequence = require( 'run-sequence' );
var browserSync = require( 'browser-sync' );
var karma = require('karma').server;
var protractorInst = require('gulp-protractor');
var gutil = require('gulp-util');

var getBrowserFromCLI = function() {   		//CLI = Command Line Interface
	var cliOption = process.argv.slice(3)[0]; 
	if ( cliOption ){
		return cliOption.slice( cliOption.lastIndexOf('-')+1 );
	}
	return null;
};

gulp.task('test:unit', function (done) {
	var opts = {
		configFile: path.test.base + 'karma.conf.js',
		singleRun: true,
		autoWatch: false,
	    reporters: [
	    	'progress',
    		'coverage'
    	],
	};

	var browser = getBrowserFromCLI();
	if ( browser ){
		browser = browser[0].toUpperCase() + browser.slice(1).toLowerCase();
		opts.browsers = [ browser ];
	}

	karma.start( opts , done);
});

gulp.task('watch:test:unit', function (done) {
	karma.start({
		configFile: path.test.base + 'karma.conf.js',
		reporters: [
			'beep',
			'progress'
		]
	}, done);
});

gulp.task('test:e2e', ['browser-sync'], function(done){
	var args = [];

	var browser = getBrowserFromCLI();
	if ( browser ){
		args.push('--browser');
		args.push( browser.toLowerCase() );
	}

	gulp.src( 
		project.test.e2e.files 
	)
	.pipe( protractorInst.protractor({
		configFile: path.test.base + 'protractor.conf.js',
		args: args
	}))
	.on('error', function(e) { 
		gutil.beep();
		browserSync.exit();
		throw e; 
	})
	.on('end', function(){
		browserSync.exit();
		done();
	});
});

gulp.task( 'test', function( done ){
	runSequence( 'test:unit', 'test:e2e', done );
});

// Downloads the selenium webdriver
gulp.task( 'webdriver-update', protractorInst.webdriver_update );
