'use strict';

var fs = require('fs');
var bower = JSON.parse( fs.readFileSync( './.bowerrc', 'utf8' ) );

var basePath = __dirname;
var path = {
	base: basePath,
	client: basePath + '/client/',
	test: {
		base: basePath + '/test/',
		client: basePath + '/test/client/',
		e2e: basePath + '/test/client/',
	},
	bower: basePath + '/' + bower.directory + '/',
	coverage: basePath + '/coverage/'
};

var karmaPreprocessors = {};
karmaPreprocessors[ path.test + '**/*.html' ] = 'ng-html2js';
karmaPreprocessors[ path.base + '/{client,client/!(bower_components)/**}/*.js' ] = 'coverage';

module.exports = {
	port: 3000,
	path: path,
	watch: {
		servedFiles: [
			path.client + '**/+(*.js|*.html|*.css)',
			'!' + path.bower + '**/+(*.js|*.html|*.css)',			//excluded
		],
	},
	test:{
		unit:{
			files : [
				path.bower + 'angular/angular.js',
				path.bower + 'angular-mocks/angular-mocks.js',
				path.client + '*.js',
				path.client + '!(bower_components)/**/*.js',
				path.test.client + '**/*.js'
			],
			exclude : [
				path.test.client + '**/*.conf.js',
				path.test.client + '**/*e2e-spec.js',
				path.test.client + '**/*pageobject.js'
		    ],
		    preprocessors: karmaPreprocessors
		},
		e2e: {
			files: [
				path.test.e2e + '**/*e2e-spec.js'
			]
		},
	}
};
