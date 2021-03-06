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

	it('debería devolver las palabras que sean artículos o preposiciones en minúsculas', function() {
		var resultado = capitalizarFilter( 'miguel de cervantes saavedra' );

		expect( resultado ).toBe( 'Miguel de Cervantes Saavedra' );
	});

	it('debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra', function() {
		var resultado = capitalizarFilter( 'la lola de españa' );

		expect( resultado ).toBe( 'La Lola de España' );
	});

	it('debería funcionar con todos los artículos y preposiciones', function(){
		var cadena = 'a el la los las un una unos unas lo al del a ante bajo cabe con contra de desde en entre hacia hasta para por según sin so sobre tras';
		var resultadoEsperado = 'A el la los las un una unos unas lo al del a ante bajo cabe con contra de desde en entre hacia hasta para por según sin so sobre tras';
		expect( capitalizarFilter( cadena ) ).toBe( resultadoEsperado );
	});

	it('debería devolver cadena vacía si se pasa cadena vacía', function(){
		expect( capitalizarFilter( '' ) ).toBe( '' );
	});
});
