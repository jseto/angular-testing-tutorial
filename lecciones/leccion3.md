Leccion 3. Un controlador robusto
---------------------------------

[Tutorial en video](https://youtu.be/pYf9bY4SdcA)

Empezaremos por algo sencillo. Un filtro de AngularJS es fácil de crear, tanto el test como la implementación. Lo que va a hacer nuestro primer filtro será poner en mayúsculas todas las palabras de una cadena, a excepción de artículos y preposiciones, que estarán en minúscula, a no ser que inicien la cadena. A nuestro filtro le llamaremos 'capitalizar'.

Siguiendo los principios del Desarrollo Guiado por Pruebas (TDD), antes de hacer la implementación, debemos codificar el test. El test lo vamos a definir siguiendo las especificaciones de nuestro filtro, es decir, vamos a escribir que es lo que va a hacer el filtro. Además, escribiremos dichas especificaciones de la siguiente forma para que nos quede más claro.

```
Dada una cadena, el filtro capitalizar
	debería poner todas las palabras con la primera letra en mayúscula
	debería devolver las palabras que sean artículos o preposiciones en minúsculas
	debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra
```
Seguimos teniendo nuestras especificaciones en español normal, pero así quedan más claras que cuando definimos nuestro filtro un poco más arriba.

Los que usáis [Sublime Text][sublime] como editor, podéis instalaros el _plugin_ [Jasmine Scaffold][jasmine-scaffold] que convierte el texto de la especificación anterior en sintaxis para **Jasmine**. [Jasmine][jasmine] provee una serie de funciones que nos facilitan la escritura de test en JavaScript.

Ahora vamos a usar las funciones `describe` e `it`. Así, nuestro test va a tomar la siguiente forma:

```js
describe('Dada una cadena, el filtro capitalizar', function() {

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {

	});

	it('debería devolver las palabras que sean artículos o preposiciones en minúsculas', function() {

	});

	it('debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra', function() {

	});
});
```

Como se observa, seguimos teniendo nuestras especificaciones en español puro, aunque ahora _decoradas_ con un poco de sintaxis JavaScript. La función `describe` encierra la descripción de nuestro test y la función `it` encierra la descripción de las especificaciones que deben ser verificadas por nuestro test.

Dentro de la función que pasamos en el segundo parámetro de `it` es donde escribiremos nuestras expectativas, es decir, lo que esperamos que pase cuando llamamos a nuestro filtro. Para ello usamos la función `expect`, a la que pasamos un valor que compararemos con una serie de métodos encadenados que nos proporciona `expect` denominados _matchers_ o verificadores. Estos verificadores, nos permiten evaluar si el resultado obtenido es el esperado. Vamos, manos a la obra.

```js
describe('Dada una cadena, el filtro capitalizar', function() {

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {
		// llamamos a nuestro filtro con alguna cadena a modo de prueba
		var resultado = capitalizarFilter( 'federico garcía lorca' );

		// ahora, vamos a ver si el resultado es el que esperamos.
		var resultadoEsperado = 'Federico García Lorca';

		expect( resultado ).toBe( resultadoEsperado );
	});

	it('debería devolver las palabras que sean artículos o preposiciones en minúsculas', function() {

	});

	it('debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra', function() {

	});
});
```

Un pequeño inciso. Si no has hecho nunca un filtro en AngularJS, debes saber que hay una convención que dice que los nombres de filtro deben acabar en _Filter_. Por eso a nuestro filtro nos referimos como `capitalizarFilter` en el código.

Si nos fijamos en la linea de código que contiene la expectativa

```js
		expect( resultado ).toBe( resultadoEsperado );
```

y la leemos en ingles, se traduce al español como

> esperamos que el `resultado` sea el `resultadoEsperado`

Fácil no? El método `toBe` es el _matcher_ o verificador. Jasmine nos provee de muchos _matchers_ e incluso podemos hacer los nuestros propios, aunque de momento no vamos a entrar en esos detalles.

Vamos a completar nuestro test

```js
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

	it('debería poner la primera palabra de la cadena siempre con la primera letra en mayúsculas', function() {
		var resultado = capitalizarFilter( 'la lola de españa' );

		expect( resultado ).toBe( 'La Lola de España' );
	});
});
```

Ya tenemos nuestro test terminado. Guarda tu test en un archivo que se llame `capitalizar.spec.js` dentro de la carpeta 'test/client'. Por convención, llamaremos a los ficheros de test como a los ficheros de la implementación pero con extensión `.spec.js`. Si no quieres escribir el test, puedes ejecutar lo siguiente en la linea de comandos

```
git checkout -f leccion2-1
```

lo cual pondrá tu proyecto en el estado del tutorial que nos encontramos ahora.

### Vamos a ejecutar nuestro primer test ###

Para ejecutar el test, simplemente escribe en la linea de comandos

```
gulp
```

esto ejecuta un servidor web local y los test unitarios. Cada vez que cambie un fichero que tenga relación con nuestro test, se volverán a ejecutar los tests automáticamente.

Como habrás visto, el test falla!!!

Ahora, nuestro trabajo consiste en hacer que el test no falle.

### Primera aproximación a nuestro filtro ###


El mensaje de error que nos da el test es

```
ReferenceError: capitalizarFilter is not defined
```

y ciertamente tiene razón, nuestro filtro no esta definido en ninguna parte. Vamos a corregir este error. Para ello creamos un un fichero que llamaremos `capitalizar.js` en una carpeta llamada `utiles` que crearemos dentro de la carpeta `cliente`. En realidad puedes darle el nombre que quieras y ponerlo en cualquier carpeta, pero hazlo de forma lógica y siguiendo patrones de buenas practicas. El contenido del fichero creado será el siguiente:

```js
'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFn(){
	return function(input) {
		return input;
	};
});
```

Esto solamente nos define nuestro filtro en AngularJS, pero lo único que hace es devolver la misma cadena que hemos pasado como parámetro al filtro, es decir, poca cosa a excepción de eliminar el error que teníamos.

Guardamos el archivo `capitalizar.js' o bien ejecutamos en la linea de comandos

```
git checkout -f leccion2-2
```

El test sigue fallando con el mismo mensaje de error puesto que en nuestro fichero de test, el filtro `capitalizarFilter` sigue sin estar definido. Para que `capitalizarFilter` este disponible en nuestro código vamos a usar la función `beforeEach` de Jasmine y la inyección de dependencias de AngularJS.

La función `beforeEach` de Jasmine indica que la función que pasamos como parámetro se va a ejecutar antes de que se ejecute cada uno de los test, es decir, en `beforeEach` pondremos el código de inicialización necesario para ejecutar nuestros tests. Podemos invocar `beforeEach` tantas veces como queramos. Análogamente, existe la función `afterEach` de Jasmine que se ejecutará al terminar cada uno de los test.

El siguiente fragmento de código, hace que se cargue el modulo `utiles` antes de que se invoque cada uno los test que le suceden.

```js
	beforeEach( function(){
		module('utiles');
	});
```

Para tener acceso a `capitalizarFilter` usaremos la inyección de dependencias pero con una sintaxis diferente a cuando la usamos en código normal. Para ello usaremos el método `inject`. Si usamos como prefijo y sufijo el carácter '\_', AngularJS inyectará el elemento correspondiente sin el afijo '_'. Con este truco, podemos usar el identificador original de nuestro elemento en el test. Como queremos que `capitalizarFilter` se inyecte cada vez que ejecutamos un test, haremos la inyección dentro de un `beforeEach` del siguiente modo:

```js
	var capitalizarFilter;
	beforeEach( inject( function( _capitalizarFilter_ ){
		capitalizarFilter = _capitalizarFilter_;
	}));
```

Así pues, nuestro fichero de test quedara como:

```js
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

	it('debería poner la primera palabra de la cadena siempre con la primera letra en mayúsculas', function() {
		var resultado = capitalizarFilter( 'la lola de españa' );

		expect( resultado ).toBe( 'La Lola de España' );
	});
});
```

Para no tener que escribir, puedes invocar lo siguiente en la linea de comandos:

```
git checkout -f leccion2-3
```

### Por fin llegamos a la implementación ###

Como observaras, el test sigue sin pasar, pero ahora ya no es debido a un error de sintaxis o que falte definir algo. Ahora falla porque nuestras expectativas no se cumplen. Estas no se cumplen precisamente porque nuestro filtro `capitalizarFilter` no hace lo que se supone que tiene que hacer.

Vamos pues a implementar `capitalizarFilter` para que nuestros test acaben pasando. La siguiente implementación resuelve el primer test.

```js
'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFn(){
	return function( input ) {
		var palabras = input.split(' ');
		var output = [];

		angular.forEach( palabras, function( palabra ){
			output.push( palabra[0].toUpperCase() + palabra.slice(1) );
		});
		return output.join(' ');
	};
});
```

Puedes comprobarlo haciendo en la linea de comandos

```
git checkout -f leccion2-4
```
y para pasar todos los tests, necesitaras el siguiente código

```js
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
```

que puedes obtener escribiendo

```
git checkout -f leccion2-5
```

Como veras, todos los test pasan. De todas formas, seguramente te has preguntado si los test que hemos escritos son suficientes. La respuesta es no. Los test deben ser independientes de la implementación y si alguien cambia la implementación en un futuro y olvida incluir algunas preposiciones, los test podrían llegar a pasar y el código no ser correcto. Así pues, vamos a añadir una expectativa más para hacer el test más completo y robusto.

```js
	it('debería funcionar con todos los artículos y preposiciones', function(){
		var cadena = 'a el la los las un una unos unas lo al del a ante bajo cabe con contra de desde en entre hacia hasta para por según sin so sobre tras';
		var resultadoEsperado = 'A el la los las un una unos unas lo al del a ante bajo cabe con contra de desde en entre hacia hasta para por según sin so sobre tras';
		expect( capitalizarFilter( cadena ) ).toBe( resultadoEsperado );
	});
```

### Vamos a jugar ###

Ahora ya ha llegado el momento de poder disfrutar de nuestra creación. Vamos a jugar con el filtro en una pagina web y vamos a probar nuestro filtro a la antigua!

Para ello vamos a cargar `capitalizar.js` en `index.html` y añadir código para poder entrar un texto y que nos lo presente filtrado

```html
	<input ng-model="cadena" />
	<p>{{cadena|capitalizar}}</p>

	<script src="utiles/capitalizar.js"></script>
```
y también debemos modificar el archivo `app.js` para que cargue el modulo _utiles_ al que pertenece nuestro filtro

```js
angular.module('app', [
	'utiles'
])
```
estos cambios los tienes en

```
git checkout -f leccion2-6
```

Pero.... hay algo que no esta bien. Cuando la cadena esta vacía, nuestro filtro genera un error que podemos ver en la consola del navegador y un efecto colateral es que se presenta la cadena `{{cadena|capitalizar}}` en el navegador en lugar de la cadena vacía. Esto es claramente un _bug_ y hay que corregirlo. Para ello crearemos otro test que compruebe que cuando pasamos una cadena vacía, se devuelva una cadena vacía. Siempre que descubrimos un _bug_ hay que generar un test para corregir ese _bug_. Así añadiremos el siguiente código a nuestro test

```js
	it('debería devolver cadena vacía si se pasa cadena vacía', function(){
		expect( capitalizarFilter( '' ) ).toBe( '' );
	});
```

comprobamos que el test falla y luego corregimos la implementación para que deje de fallar. Añadiendo el siguiente código a la implementación debería corregir nuestro error.

```js
		if ( !input ) {
			return '';
		}
```

Todas estas correcciones están en:

```
git checkout -f leccion2-7
```

### Que debemos recordar ###

En esta lección hemos abordado varios temas, pero hay unos conceptos que son fundamentales al TDD e independientes de la plataforma o lenguaje que usemos.

* Hay que escribir los test antes que la implementación
* Los test describen la especificación del problema
* Los test dan pistas sobre la forma de uso de los componentes que se testean
* Los test no tienen en cuenta como es la implementación ni deben presumir que tipo de implementación se usará
* Solo se hace test de la API publica
* Cuando se prepara un test, primero tiene que fallar para posteriormente escribir la implementación
* Cuando encontramos un _bug_ hay que escribir un nuevo test que aborde el _bug_

[_Volver al indice_](../README.md)
