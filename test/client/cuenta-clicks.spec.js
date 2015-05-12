'use strict';

describe('El controlador CuentaClicksCtrl', function() {
	var $scope;
	var ctrl;

	beforeEach( module( 'myApp' ) );

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

