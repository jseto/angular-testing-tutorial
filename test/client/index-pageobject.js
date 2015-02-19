'use strict';

var IndexPageObject = function() {
	this.body = element( by.css('body') );
};

module.exports = new IndexPageObject();