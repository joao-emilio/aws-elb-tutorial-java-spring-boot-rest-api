'use strict';

angular.module('myApp').controller('CidadeController', ['$scope', 'CidadeService', 'EstadoService', function($scope, CidadeService, EstadoService) {

    var self = this;
    $scope.cidade={
        id:"",
        estado:{
            uf : "",
            nome:'',
            pais:{
                id: "",
                codigo: "",
                nome: ""
            }
        }
        };

    findAll();

    EstadoService.findAll().then(function(d) {
        $scope.estados = d;
    });

    $scope.new = function() {
        $scope.cidade = {};
        $scope.orig = angular.copy($scope.cidade);
        $scope.cidade = $scope.orig;
    }

    $scope.delete = function (id) {
        CidadeService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        CidadeService.find(id).then(function(d) {
            $scope.cidade = d;
        });
    }

    function update(cidade) {
        CidadeService.update(cidade).then(function(d) {
            findAll();
        });
    }

    function create(cidade) {

        CidadeService.create(cidade).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        CidadeService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_cidade) {
        if( _cidade.id == null ) {
            create(_cidade);
            this.new();
        } else {
            update(_cidade);
            this.new();
        }

        $('#myModal').modal('hide')

    }

}]);