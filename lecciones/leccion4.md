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

convertimos las especificaciones a sintaxis de _Jasmine_


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
_scope_ asociado.

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

Podéis encontrar el código haciendo

```
git checkout -f leccion4-1
```

### La implementación de la directiva ###

La directiva es sencilla de implementar. Simplemente tendrá una plantilla con
los cinco iconos de una estrella vacía y una función `link` que cambiará el
icono de la estrella vacía a una estrella rellena según el estado de `puntuacion`
que estaremos observando dentro de `$watch` a través del atributo `estrellas`. El
código final quedaría como sigue:

```js
'use strict';

angular.module('valoracion', [

])

.directive( 'estrellas', function(){
    return {
        restrict: 'AC',
        template: function(){
            return [
                '<div>',
                '    <span class="glyphicon glyphicon-star-empty"></span>',
                '    <span class="glyphicon glyphicon-star-empty"></span>',
                '    <span class="glyphicon glyphicon-star-empty"></span>',
                '    <span class="glyphicon glyphicon-star-empty"></span>',
                '    <span class="glyphicon glyphicon-star-empty"></span>',
                '</div>'
            ].join('\n');
        },
        link: function(scope, element, attrs) {
            scope.$watch( attrs.estrellas, function( value, oldValue ){
                var starElements = element.find('span');

                angular.forEach( starElements, function( starEl, key ){
                    var el = angular.element( starEl );
                    el.removeClass( 'glyphicon-star-empty' );
                    el.removeClass( 'glyphicon-star');

                    if ( key < value ) {
                        el.addClass( 'glyphicon-star' );
                    }
                    else {
                        el.addClass( 'glyphicon-star-empty' );
                    }
                });
            });
        }
    };
});
```

que podéis obtener escribiendo en la linea de comando:

```
git checkout -f leccion4-2
```

### Probando la directiva en el navegador ###

Por ultimo solo nos queda ver como se comporta nuestra directiva en el navegador.
Para ello añadimos en el fichero `index.html` el nuevo _script_

```html
	<script src="utiles/estrellas.js"></script>
```

y una etiqueta `div` con nuestra directiva y una etiqueta `input` para introducir el valor de
la puntuación

```html
	<div style="padding: 30px;">
		<label>Indica la puntuación</label>
		<input ng-model="puntuacion" />
		<div estrellas="puntuacion"></div>
	</div>
```

y también cargamos el modulo de la directiva `valoracion` en el archivo `app.js`

```js
angular.module('app', [
	'utiles',
	'valoracion'
])
```

Si no te funciona, encontraras el código completo aquí:

```
git checkout -f leccion4-3
```

### Que debemos recordar ###

En esta lección solo hemos introducido un nuevo concepto que es la compilación de
la directiva. De ello debemos recordar:

* Que tenemos que compilar el código html donde llamaremos a la directiva que
queremos testear con el servicio `$compile`
* Al mismo tiempo que compilamos, asociamos un `$scope` que hemos instanciado y
sobre el que tendremos control
* Una vez compilado hay que llamar a `$digest` para que se inicie el proceso de
actualización de los _data bindings_
* Para cambiar los valores de los miembros de `$scope` lo haremos dentro del
método `$apply` de nuestro `$scope`

[_Volver al indice_](../README.md)

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
