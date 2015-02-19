'use strict';

describe('myApp', function() {
	var indexPage = require('./index-pageobject.js');

	browser.get('/');

	it('should have body tag', function(){
		expect(
			indexPage.body.isPresent()
		).toBe( true );
	}); 
});


