'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFactory(){
	return function(input) {
		return input;
	};
}); 