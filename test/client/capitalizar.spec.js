describe('Dada una cadena, el filtro capitalizar', function() {

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
});
