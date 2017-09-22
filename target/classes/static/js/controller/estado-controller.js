'use strict';

/*
*@author renatocesar
* 05/17/2017
*/

angular.module('myApp').controller('EstadoController', ['$scope', 'EstadoService', 'PaisService', function($scope, EstadoService, PaisService) {

    var self = this;
    $scope.estado={
        uf:"",
        pais:{
            id: "",
            codigo: "",
            nome: ""
        }};

    findAll();

    PaisService.findAll().then(function(d) {
        $scope.paises = d;
    });

    $scope.new = function() {
        $scope.estado = {};
        $scope.orig = angular.copy($scope.estado);
        $scope.estado = $scope.orig;
    }

    $scope.delete = function (id) {
        EstadoService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        EstadoService.find(id).then(function(d) {
            $scope.estado = d;
        });
    }

    function update(estado) {
        EstadoService.update(estado).then(function(d) {
            findAll();
            $('#myModal').modal('hide')
        });
    }

    function create(estado) {
        EstadoService.create(estado).then(function(d) {
            findAll();
            $('#myModal').modal('hide')
        });
    }

    function findAll() {
        EstadoService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_estado) {
        if( _estado.uf == null ) {
            create(_estado);
            this.new();
        } else {
            update(_estado);
            this.new();
        }
    }
}]);