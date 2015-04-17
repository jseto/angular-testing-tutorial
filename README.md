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

Empezaremos por algo sencillo. Un filtro de AngularJS es fácil de crear, tanto el test como la implementación. Lo que va hacer nuestro primer filtro será poner en mayúsculas todas las palabras de una cadena, a excepción de los artículos, que estarán en minúscula a no ser que inicien la cadena. A nuestro filtro le llamaremos 'capitalizar'.

Siguiendo los principios del Desarrollo Orientado a Tests (TDD), antes de hacer la implementación, debemos codificar el test. El test lo vamos a definir siguiendo las especificaciones de nuestro filtro, es decir, vamos a escribir que es lo que va a hacer el filtro. Ademas, las escribiremos de la siguiente forma para que nos quede más claro.

```
Dada una cadena, el filtro capitalizar
	debería poner todas las palabras con la primera letra en mayúscula
	debería devolver las palabras que sean artículos en minúsculas
	debería poner la primera letra en mayúsculas si el articulo es la primera palabra de la cadena
```
Seguimos teniendo nuestras especificaciones en español normal, pero así quedan más claras que cuando definimos nuestro filtro un poco más arriba. 

Los que usáis _Sublime Text_ como editor, podéis instalaros el 'plugin' _Jasmine Scafold_ que convierte el texto de la especificación anterior en sintaxis para Jasmine. [Jasmine][jasmine] provee una serie de funciones que nos facilitan la escritura de test en JavaScript. 

Ahora vamos a usar las funciones `describe` e `it`. Así, nuestro test va a tomar la siguiente forma:

```js
describe('Dada una cadena, el filtro capitalizar', function() {

	it('debería poner todas las palabras con la primera letra en mayúscula', function() {

	});

	it('debería devolver las palabras que sean artículos en minúsculas', function() {

	});

	it('debería poner la primera letra en mayúsculas si el articulo es la primera palabra de la cadena', function() {

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

	it('debería poner la primera letra en mayúsculas si el articulo es la primera palabra de la cadena', function() {

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

	it('debería poner la primera letra en mayúsculas si el articulo es la primera palabra de la cadena', function() {
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

Vamos a ejecutar nuestro primer test
------------------------------------

Para ejecutar el test, simplemente escribe en la linea de comandos

```
gulp
```

esto ejecuta un servidor web local y los test unitarios. Cada vez que cambie un fichero que tenga relación con nuestro test, se volverán a ejecutar los tests automáticamente.

Como habrás visto, el test falla!!!

Ahora, nuestro trabajo consiste en hacer que el test no falle.



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