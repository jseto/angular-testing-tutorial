'use strict';

//* App Module 

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
	
	$scope.$on( 'click3Veces', function(){
		$scope.contador = 0;
	});
});

