'use strict';

describe( 'La directiva estrellas', function() {
    var htmlText = '<div estrellas="valoracion"></div>';
    var el, scope;

    beforeEach( module('valoracion' ) );

    beforeEach( inject( function( $compile, $rootScope ) {
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
                scope.valoracion = 0;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 5 );
            expect( estrellasRellenas.length ).toBe( 0 );
        });

        it( 'deberia mostrar las todas las estrellas rellenas con puntuación 5', function() {
            scope.$apply( function(){
                scope.valoracion = 5;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 0 );
            expect( estrellasRellenas.length ).toBe( 5 );
        });

        it( 'deberia mostrar n estrellas rellenas para el puntuación n entero', function() {
            scope.$apply( function(){
                scope.valoracion = 3;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 2 );
            expect( estrellasRellenas.length ).toBe( 3 );
        });

        it( 'deberia mostrar n estrellas rellenas para el puntuación r real', function() {
            scope.$apply( function(){
                scope.valoracion = 1.7;
            });

            var estrellasHuecas = el.find( '.glyphicon-star-empty' );
            var estrellasRellenas = el.find( '.glyphicon-star' );

            expect( estrellasHuecas.length ).toBe( 3 );
            expect( estrellasRellenas.length ).toBe( 2 );
        });

    });
});
