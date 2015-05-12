Lección 3. Un controlador robusto
---------------------------------

[Tutorial en vídeo]()

Siguiendo el patrón de la lección anterior, vamos a escribir las especificaciones que deberá tener el controlador que vamos a desarrollar. Nuestro controlador va a hacer algo muy fácil, contará las veces que se pulsa un botón. El contador deberá estar disponible para la vista y se notificara a la aplicación cuando la cuenta llegue a 3 emitiendo un mensaje. Nos referiremos al controlador con el nombre `AppCtrl` puesto que lo vamos a implementar en el controlador de la aplicación. Vamos a ello.

```
El controlador AppCtrl
	debería proveer una función para manejar los eventos ngClick
	debería incrementar un contador disponible en la vista
	debería emitir un mensaje cada vez que el contador llegue a tres
```

Convertimos las especificaciones a sintaxis Jasmine.

```js
describe('El controlador AppCtrl', function() {

	it('debería proveer una función para manejar los eventos ngClick', function() {

	});

	it('debería incrementar un contador disponible en la vista', function() {

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

	it('debería proveer una función para manejar los eventos ngClick', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador disponible en la vista', function() {
		expect( scope.contador ).toBe( 0 );
		
		$scope.cuentaClicks();

		expect( $scope.contador ).toBe( 1 );
	});

	it('debería emitir un mensaje cada vez que el contador llegue a tres', function() {

	});

});
```

La tercera especificación es un poco más difícil de implementar aunque hay diversas opciones. 
La más elegante es usar los espías de Jasmine. Un espía, lo que hace es precisamente eso, espiar.
En nuestro caso espiará si se ha invocado el método $emit del objecto $scope.

Para definir un espía usamos la función `spyOn`, que pondremos dentro de un `beforeEach`. 
Como primer parámetro pasamos el objeto que contiene el método que queremos espiar, en nuestro 
caso, `$scope` y el segundo parámetro es una cadena con el nombre del método, que para nosotros 
sera '$emit'.

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

	it('debería proveer una función para manejar los eventos ngClick', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador disponible en la vista', function() {
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
		scope = $rootScope.$new();
		ctrl = $controller( 'AppCtrl', { $scope: scope });
	}));

	beforeEach(function(){
		spyOn( $scope, '$emit' );
	})

	it('debería proveer una función para manejar los eventos ngClick', function() {
		expect( $scope.cuentaClicks ).toBeDefined();
	});

	it('debería incrementar un contador disponible en la vista', function() {
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

[_Volver al indice_](../README.md)
