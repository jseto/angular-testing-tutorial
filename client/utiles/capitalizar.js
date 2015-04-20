'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFactory(){
	return function( input ) {
		var palabras = input.split(' ');
		var output = [];

		angular.forEach( palabras, function( palabra ){
			output.push( palabra[0].toUpperCase() + palabra.slice(1) );
		});
		return output.join(' ');
	};
}); 