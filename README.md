Tutorial de test unitarios en AngularJS
=======================================

El tutorial revisa los conceptos básicos para hacer test unitarios en [AngularJS][angular] con [Jasmine][jasmine] y [Karma][karma]. 
El proyecto esta basado en [js-seed][jsseed]. Puedes referirte a este proyecto para saber como usarlo y configurarlo.

Preparación
-----------

Para ejecutar los test del tutorial, debes tener instalado en tu sistema los siguientes componentes:

- el controlador de versiones [GIT][git]
- la plataforma [NodeJS][node]
- el sistema de _buildeo_ [Gulp][gulp]

Gulp se instala una vez tienes NodeJS instalado y funcionando. Es necesario instalarlo de forma global invocando en la linea de comandos:

```
npm install -g gulp
```

Una vez instalados los prerequisitos, clona el repositorio [angular-testing-tutorial][angular-testing-tutorial] e instala las dependencias.

```
git clone https://github.com/jseto/angular-testing-tutorial.git
npm install
```

Leccion 1. Nos familiarizamos con el entorno de trabajo
-------------------------------------------------------

[Tutorial en video][]

Leccion 2. Vamos a crear un filtro
----------------------------------

[Tutorial en video][]

Empezaremos por algo sencillo. Un filtro de AngularJS es fácil de crear, tanto el test como la implementación. Lo que va hacer nuestro primer filtro será poner en mayúsculas todas las palabras de una cadena, a excepción de artículos y preposiciones, que estarán en minúscula a no ser que inicien la cadena. A nuestro filtro le llamaremos 'capitalizar'.

Siguiendo los principios del Desarrollo Orientado a Tests (TDD), antes de hacer la implementación, debemos codificar el test. El test lo vamos a definir siguiendo las especificaciones de nuestro filtro, es decir, vamos a escribir que es lo que va a hacer el filtro. Ademas, las escribiremos de la siguiente forma para que nos quede más claro.

```
Dada una cadena, el filtro capitalizar
	debería poner todas las palabras con la primera letra en mayúscula
	debería devolver las palabras que sean artículos o preposiciones en minúsculas
	debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra
```
Seguimos teniendo nuestras especificaciones en español normal, pero así quedan más claras que cuando definimos nuestro filtro un poco más arriba. 

Los que usáis [Sublime Text][sublime] como editor, podéis instalaros el 'plugin' [Jasmine Scaffold][jasmine-scaffold] que convierte el texto de la especificación anterior en sintaxis para Jasmine. [Jasmine][jasmine] provee una serie de funciones que nos facilitan la escritura de test en JavaScript. 

Ahora vamos a usar las funciones `describe` e `it`. Así, nuestro test va a tomar la siguiente forma:

```js
describe('Dada una cadena, el filtro capitalizar', function() {

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {

	});

	it('debería devolver las palabras que sean artículos en minúsculas', function() {

	});

	it('debería poner la primera letra de la cadena en mayúsculas independientemente del tipo de palabra', function() {

	});
});
```

Como se observa, seguimos teniendo nuestras especificaciones en español puro, aunque ahora _decoradas_ con un poco de sintaxis JavaScript. La función `describe` encierra una descripción de nuestro test y la función `it` encierra la descripción de las especificaciones que deben ser verificadas por nuestro test.

Dentro de la función que pasamos en el segundo parámetro de `it` es donde escribiremos nuestras expectativas, es decir, lo que esperamos que pase cuando llamamos a nuestro filtro. Para ello usamos la función `expect`, a la que pasamos un valor que compararemos con una serie de métodos encadenados que nos proporciona `expect` denominados _matchers_ o verificadores. Estos verificadores, nos permiten evaluar si el resultado obtenido es el esperado. Vamos manos a la obra.

```js
describe('Dada una cadena, el filtro capitalizar', function() {

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {
		// llamamos a nuestro filtro con alguna cadena a modo de prueba
		var resultado = capitalizarFilter( 'federico garcía lorca' );

		// ahora, vamos a ver si el resultado es el que esperamos.
		var resultadoEsperado = 'Federico García Lorca';

		expect( resultado ).toBe( resultadoEsperado );
	});

	it('debería devolver las palabras que sean artículos en minúsculas', function() {

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

Fácil no? El método `toBe` es el _matcher_ o verificador. Jasmine nos provee de muchos _matchers_ e incluso podemos hacer los nuestros propios, aunque de momento no vamos a entrar en detalles de ello.

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

Ya tenemos nuestro test terminado. Guarda tu test en un archivo que se llame `capitalizar.spec.js` dentro de la carpeta 'test/client'. Si no quieres escribir el test, puedes ejecutar lo siguiente en la linea de comandos

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

y ciertamente tiene razón, nuestro filtro no esta definido en ninguna parte. Vamos a corregir este error. Para ello creamos un un fichero que llamaremos `capitalizar.js` en una carpeta llamada `utiles` que crearemos dentro de la carpeta `cliente`. El contenido del fichero creado será el siguiente:

```js
'use strict';

angular.module( 'utiles', [] )

.filter( 'capitalizar', function capitalizarFactory(){
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

El test sigue fallando con el mismo mensaje de error puesto que en nuestro fichero de test, el filtro `capitalizarFilter` sigue sin estar definido. Para definir `capitalizarFilter` vamos a usar la función `beforeEach` de Jasmine y la inyección de dependencias de AngularJS.

La función `beforeEach` de Jasmine indica que la función que pasamos como parámetro se va a ejecutar antes de que se ejecute cada uno de los test, es decir, en `beforeEach` pondremos el código de inicialización necesario para ejecutar nuestros tests. Podemos invocar `beforeEach` tantas veces como queramos. Análogamente, existe la función `afterEach` de Jasmine que se ejecutará al terminar cada uno de los test.

El siguiente fragmento de código, indica que se cargue el modulo `utiles` antes de que se invoque cada uno los test que le suceden.

```js
	beforeEach( function(){
		module('utiles');
	});
```

Para tener acceso a `capitalizarFilter` usaremos la inyección de dependencias pero con una sintaxis diferente a cuando la usamos en código normal. Para ello usaremos el método `inject`. Si usamos como prefijo y sufijo el carácter '\_', angular lo eliminara e inyectará el elemento correspondiente sin el afijo '_'. Con este truco, podemos usar el identificador original de nuestro elemento en el test. Como queremos que `capitalizarFilter` se inyecte cada vez que ejecutamos un test, haremos la inyección dentro de un `beforeEach` del siguiente modo:

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

Como observaras, el test sigue sin pasar pero ahora ya no es debido a un error de sintaxis o que falte definir algo. Ahora falla porque nuestras expectativas no se cumplen. Estas no se cumplen precisamente porque nuestro filtro `capitalizarFilter` no hace lo que se supone que tiene que hacer.

Vamos pues a implementar `capitalizarFilter` para que nuestros test acaben pasando.




# Licencia

__Angular Testing Tutorial__ se distribuye bajo licencia del [MIT](http://opensource.org/licenses/MIT)


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: http://travis-ci.org/
[loopback]: http://loopback.io/
[angular]: http://angularjs.org
[passport]: http://passportjs.org/
[bootstrap]: http://getbootstrap.com/
[fontawesome]: http://fortawesome.github.io/Font-Awesome/
[heroku]: http://heroku.com
[less]: http://lesscss.org
[jslib]: http://github.com/jseto/jsLib
[jasmine-node]: http://github.com/mhevery/jasmine-node
[gulp]: http://gulpjs.com/
[jsseed]: http://github.com/jseto/js-seed.git
[angular-testing-tutorial]: http://github.com/jseto/angular-testing-tutorial.git
[sublime]: http://www.sublimetext.com/3
[jasmine-scaffold]: https://packagecontrol.io/packages/Jasmine%20Scaffold
