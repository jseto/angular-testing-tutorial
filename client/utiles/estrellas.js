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
