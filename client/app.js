'use strict';

//* App Module 

angular.module('app', [
	'utiles'
])

.controller('AppCtrl', function( $scope ){
	$scope.contador = 0;

	$scope.cuentaClicks = function(){
		$scope.contador += 1;
	};
	
});

