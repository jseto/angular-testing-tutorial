describe('Dada una cadena, el filtro capitalizar', function() {
	var capitalizarFilter;

	beforeEach( function(){
		module('utiles');
	});

	beforeEach( inject( function( _capitalizarFilter_ ){
		capitalizarFilter = _capitalizarFilter_;
	}));

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {
		// llamamos a nuestro filtro con alguna cadena a modo de prueba
		var resultado = capitalizarFilter( 'federico garcía lorca' );

		// ahora, vamos a ver si el resultado es el que esperamos.
		var resultadoEsperado = 'Federico García Lorca';

		expect( resultado ).toBe( resultadoEsperado );
	});

	it('debería devolver las palabras que sean artículos en minúsculas', function() {
		var resultado = capitalizarFilter( 'miguel de cervantes saavedra' );

		expect( resultado ).toBe( 'Miguel de Cervantes Saavedra' );
	});

	it('debería poner la primera letra en mayúsculas si el articulo es la primera palabra de la cadena', function() {
		var resultado = capitalizarFilter( 'la lola de españa' );

		expect( resultado ).toBe( 'La Lola de España' );
	});
});
