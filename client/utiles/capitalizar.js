'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFn(){
	return function(input) {
		return input;
	};
}); 