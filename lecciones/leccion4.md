Lección 4. Las directivas también podemos testearlas
----------------------------------------------------

Una de las cosas más poderosas que nos aporta AngularJS son las directivas. Sería
extraño que el equipo de AngularJS no hubiera pensado en un forma sencilla de
hacer pruebas unitarias para ellas.

Nuestra directiva va a mostrar en el navegador 5 estrellas que serán rellenadas
según el valor que le pasemos. En definitiva, el típico sistema de valoración
que se usa en muchos sitios web. La directiva se llamará **estrellas** y empezaremos
escribiendo las especificaciones.

```
La directiva estrellas
	debería mostrar 5 estrellas
	cuando se cambia la puntuación
		debería mostrar las todas las estrellas huecas con puntuación 0
		debería mostrar las todas las estrellas rellenas con puntuación 5
		debería mostrar n estrellas rellenas para el puntuación n entero
		debería mostrar n estrellas rellenas para el puntuación r real
```

convertimos las especificaciones a sintaxis de Jasmine


```js
describe( 'La directiva estrellas', function() {

	it( 'debería mostrar 5 estrellas', function() {

	});

	describe( 'cuando se cambia la puntuación', function() {

		it( 'debería mostrar las todas las estrellas huecas con puntuación 0', function() {

		});

		it( 'debería mostrar las todas las estrellas rellenas con puntuación 5', function() {

		});

		it( 'debería mostrar n estrellas rellenas para el puntuación n entero', function() {

		});

		it( 'debería mostrar n estrellas rellenas para el puntuación r real', function() {

		});

	});

});
```

y empezamos a escribir nuestro test.

Para testear una directiva tenemos que compilar una cadena de texto que contenga
el html que llama a la directiva. En nuestro caso, este será muy sencillo

```html
<div estrellas="puntuacion"></div>
```

donde `estrellas` es el nombre de la directiva y `puntuacion` es un miembro del
scope asociado.

La compilación de la cadena html la haremos inyectando `$compile` y `$rootScope`
en un `beforeEach`. De `$rootScope` obtendremos una instancia que asociaremos al
elemento compilado. Ademas, llamaremos al método `$digest` de `$scope` para que
se actualicen los _data bindings_.

```js
	var el, scope;

	beforeEach( inject( function( $compile, $rootScope ) {
		var htmlText = '<div estrellas="puntuacion"></div>';

        scope = $rootScope.$new();
        el = $compile( htmlText )( scope );
        scope.$digest();
    }));
```

Una vez hecha la inicialización para cada uno de los test, vamos a codificar las
expectativas. En el caso de los test, vamos a usar jQuery para encontrar los
elementos de forma más cómoda que solo con jQLite. Haremos un uso intensivo de
`angular.element().find()` para verificar que los elementos hijos han sido creados
por la directiva. En nuestro caso, contaremos los elementos que tengan la clase
`.glyphicon-star` y `.glyphicon-star-empty`. Estas dos clases de _Bootstrap_
corresponden a los iconos de una estrella rellena y una estrella hueca respectivamente.

Para modificar un atributo de `$scope` lo debemos hacer dentro del método `$apply`
para que se actualice. Nosotros cambiaremos así el valor de `puntuacion` para cada
unos de los test.

```js
scope.$apply( function(){
	scope.puntuacion = 5;
});
```

Así, nuestro test completo quedará como sigue

```js
'use strict';

describe( 'La directiva estrellas', function() {
    var el, scope;

    beforeEach( module('valoracion' ) );

    beforeEach( inject( function( $compile, $rootScope ) {
		var htmlText = '<div estrellas="puntuacion"></div>';

        scope = $rootScope.$new();
        el = $compile( htmlText )( scope );
        scope.$digest();
    }));

    it( 'deberia mostrar 5 estrellas', function() {
        var estrellas = el.find('.glyphicon-star-empty');
        expect( estrellas.length ).toBe( 5 );
    });

    describe( 'cuando se cambia la puntuación', function() {

        it( 'deberia mostrar las todas las estrellas huecas con puntuación 0', function() {
            scope.$apply( function(){
                scope.puntuacion = 0;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 5 );
            expect( estrellasRellenas.length ).toBe( 0 );
        });

        it( 'deberia mostrar las todas las estrellas rellenas con puntuación 5', function() {
            scope.$apply( function(){
                scope.puntuacion = 5;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 0 );
            expect( estrellasRellenas.length ).toBe( 5 );
        });

        it( 'deberia mostrar n estrellas rellenas para el puntuación n entero', function() {
            scope.$apply( function(){
                scope.puntuacion = 3;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 2 );
            expect( estrellasRellenas.length ).toBe( 3 );
        });

        it( 'deberia mostrar n estrellas rellenas para el puntuación r real', function() {
            scope.$apply( function(){
                scope.puntuacion = 1.7;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 3 );
            expect( estrellasRellenas.length ).toBe( 2 );
        });

    });
});
```

Como siempre guardamos y verificamos que el test falla antes de proceder a la
implementación de la directiva.


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
