'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFn(){
	return function( input ) {
		var palabras = input.split(' ');
		var output = [];
		var articulos = 'el, la, los, las, un, una, unos, unas, lo, al, del'.split(', ');
		var preposiciones = 'a, ante, bajo, cabe, con, contra, de, desde, en, entre, hacia, hasta, para, por, según, sin, so, sobre, tras'.split(', ');
		var excepciones = articulos.concat( preposiciones );

		angular.forEach( palabras, function( palabra, index ){
			if ( excepciones.indexOf( palabra ) < 0 || index === 0 ) {
				palabra = palabra[0].toUpperCase() + palabra.slice(1);
			}
			output.push( palabra );
		});

		return output.join(' ');
	};
}); 