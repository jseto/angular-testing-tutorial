Lección 3. Un controlador robusto
---------------------------------

[Tutorial en vídeo]()

Siguiendo el patrón de la lección anterior, vamos a escribir las especificaciones que deberá tener el controlador que vamos a desarrollar. Nuestro controlador va a hacer algo muy fácil, contará las veces que se pulsa un botón. El contador deberá estar disponible para la vista y se notificara a la aplicación cuando la cuenta llegue a 3 emitiendo un mensaje. Nos referiremos al controlador con el nombre `AppCtrl` puesto que lo vamos a implementar en el controlador de la aplicación. Vamos a ello.

```
El controlador AppCtrl
	debería proveer una función para manejar los eventos del botón
	debería incrementar un contador por cada click y que este disponible para la vista
	debería emitir un mensaje cada vez que el contador llegue a tres
```

Convertimos las especificaciones a sintaxis Jasmine.

```js
describe('El controlador AppCtrl', function() {

	it('debería proveer una función para manejar los eventos del botón', function() {

	});

	it('debería incrementar un contador por cada click y que este disponible para la vista', function() {

	});

	it('debería emitir un mensaje cada vez que el contador llegue a tres', function() {

	});

});

```

Y empezamos a definir nuestros test. La dos primeras especificaciones son fáciles de implementar
si hemos seguido la lección 2 del tutorial y el test quedaría así:


```js
describe('El controlador AppCtrl', function() {
	var $scope;

	it('debería proveer una función para manejar los eventos del botón', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador por cada click y que este disponible para la vista', function() {
		expect( $scope.contador ).toBe( 0 );

		$scope.cuentaClicks();

		expect( $scope.contador ).toBe( 1 );
	});

	it('debería emitir un mensaje cada vez que el contador llegue a tres', function() {

	});

});
```

La tercera especificación es un poco más difícil de implementar aunque hay diversas opciones.
La más elegante es usar los espías de Jasmine. Un espía, lo que hace es precisamente eso, espiar.
En nuestro caso espiará si se ha invocado el método `$emit` del objecto `$scope`.

Para definir un espía usamos la función `spyOn`, que pondremos dentro de un `beforeEach`.
Como primer parámetro pasamos el objeto que contiene el método que queremos espiar, en nuestro
caso, `$scope` y el segundo parámetro es una cadena con el nombre del método, que para nosotros
sera '_$emit_'.

`spyOn( $scope, '$emit' );`

Para usar los espías, simplemente haremos uso del _matcher_ o verificador `toHaveBeenCalled()`. Así,
escribiremos:

`expect( $scope.$emit ).toHaveBeenCalled()`

Que del ingles se traduce como

> esperamos que `$scope.$emit` haya sido invocado

Con los test para cada una de las especificaciones, nos queda el siguiente código:

```js
describe('El controlador AppCtrl', function() {
	var $scope;

	beforeEach(function(){
		spyOn( $scope, '$emit' );
	})

	it('debería proveer una función para manejar los eventos del botón', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador por cada click y que este disponible para la vista', function() {
		expect( $scope.contador ).toBe( 0 );

		$scope.cuentaClicks();

		expect( $scope.contador ).toBe( 1 );
	});

	it('debería emitir un mensaje cada vez que el contador llegue a tres', function() {
		expect( $scope.contador ).toBe( 0 );

		$scope.cuentaClicks();
		$scope.cuentaClicks();
		$scope.cuentaClicks();

		expect( $scope.$emit ).toHaveBeenCalled();
	});

});
```

Ahora solo nos queda definir la variable `$scope` que esta asociada a nuestro controlador.
Para ello, cargamos el controlador que estará en el modulo `app`, inyectamos `$rootScope`
y asignamos una nueva instancia de `$rootScope` a nuestra variable `$scope`. Luego inyectamos
el proveedor de controladores `$controller` para crear una instancia de nuestro controlador
que guardaremos en `ctrl`. En el segundo parámetro del proveedor pasamos un objeto con
todas las dependencias que queremos inyectar al controlador. En nuestro caso solo inyectamos
`$scope`.

al final, nuestro test queda como

```js
'use strict';

describe('El controlador CuentaClicksCtrl', function() {
	var $scope;
	var ctrl;

	beforeEach( module( 'app' ) );

	beforeEach( inject( function( $controller, $rootScope ){
		$scope = $rootScope.$new();
		ctrl = $controller( 'AppCtrl', { $scope: $scope });
	}));

	beforeEach(function(){
		spyOn( $scope, '$emit' );
	})

	it('debería proveer una función para manejar los eventos del botón', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador por cada click y que este disponible para la vista', function() {
		expect( $scope.contador ).toBe( 0 );

		$scope.cuentaClicks();

		expect( $scope.contador ).toBe( 1 );
	});

	it('debería emitir un mensaje cada vez que el contador llegue a tres', function() {
		expect( $scope.contador ).toBe( 0 );

		$scope.cuentaClicks();
		$scope.cuentaClicks();
		$scope.cuentaClicks();

		expect( $scope.$emit ).toHaveBeenCalled();
	});

});
```

Si no lo quieres escribir, ejecuta en la linea de comando

```
git checkout -f leccion3-1
```

guardamos y verificamos que los test fallan

### La implementación del controlador ###

Vamos a codificar la implementación del controlador. Dado que va a ser el controlador
de la aplicación, vamos a aprovechar el fichero `app.js` para definir allí el controlador.
Al controlador que tenemos por defecto le inyectamos `$scope` y creamos la función
`cuentaClicks`

```js
	$scope.cuentaClicks = function(){
		$scope.contador += 1;
	};
```

al crear la función, también creamos el miembro `contador` y por tanto, en este paso se
verifican los dos primeros test.

el codigo queda como

```js
angular.module('app', [
	'utiles'
])

.controller('AppCtrl', function( $scope ){
	$scope.contador = 0;

	$scope.cuentaClicks = function(){
		$scope.contador += 1;
	};

});
```

lo tienes disponible escribiendo

```
git checkout -f leccion3-2
```

y veras que solo nos queda un test por verificar

### Notificando tres clicks ###

Para notificar los 3 clicks, simplemente llamamos al metodo `$emit` de `$scope`
cuando la cuenta llegue a 3. El codigo queda asi

```js
angular.module('app', [
	'utiles'
])

.controller('AppCtrl', function( $scope ){
	$scope.contador = 0;

	$scope.cuentaClicks = function(){
		$scope.contador += 1;
		if ( $scope.contador >= 3 ) {
			$scope.$emit( 'click3Veces' );
		}
	};

});
```

y además verificamos que todos nuetros test estan pasando.

El código completo lo puedes obtener escribiendo en la linea de comando:

```
git checkout -f leccion3-3
```

### Llega el momento de jugar ###

Vamos a crear un boton en el archivo `index.html` que será el que tenga asociado el metodo `cuentaClicks`
y vamos a mostrar el numero de veces que hemos hecho _click_ en el botón.

```html
	<div style="padding: 30px;">
		<button ng-click="cuentaClicks()">Clickeame!</button>
		<p>Has pulsado el botón {{contador}} veces</p>
	</div>
```

Aha! funciona. Para ver la funcionalidad de `$emit` simplemente vamos a escuchar en el evento `click3Veces`
y pondremos a cero el contador. Esto lo hacemos en el controlador.

```js
	$scope.$on( 'click3Veces', function(){
		$scope.contador = 0;
	});
```

Tienes el código completo haciendo

```
git checkout -f leccion3-4
```

### Que debemos recordar ###

En esta lección hemos abordado los test de un controlador y los espias de Jasmine. Por lo tanto, recordaremos que

* Que podemos observar la invocación de métodos con los espias de Jasmine
* Que debemos crear una instancia del controlador con el proveedor `$controller` para hacer los test sobre esa instancia
* Que podemos inyectar un $scope propio en el controlador teniendo asi control sobre el _scope_ del controlador


[_Volver al indice_](../README.md)
