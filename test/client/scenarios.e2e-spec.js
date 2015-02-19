'use strict';

describe('app e2e test', function() {
	var indexPage = require('./index-pageobject.js');

	browser.get('/');

	it('should have body tag', function(){
		expect(
			indexPage.body.isPresent()
		).toBe( true );
	}); 
});


