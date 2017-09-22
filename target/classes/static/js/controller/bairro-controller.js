'use strict';

angular.module('myApp').controller('BairroController', ['$scope', 'BairroService', 'CidadeService', function($scope, BairroService, CidadeService) {

    var self = this;
    $scope.bairro={id:null,nome:'',valor:'',descricao:''};

    findAll();

    CidadeService.findAll().then(function(d) {
        $scope.cidades = d;
    });

    $scope.new = function() {
        $scope.bairro = {};
        $scope.orig = angular.copy($scope.bairro);
        $scope.bairro = $scope.orig;
    }

    $scope.delete = function (id) {
        BairroService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        BairroService.find(id).then(function(d) {
            $scope.bairro = d;
        });
    }

    function update(bairro) {
        BairroService.update(bairro).then(function(d) {
            findAll();
        });
    }

    function create(bairro) {

        BairroService.create(bairro).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        BairroService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_bairro) {
        if( _bairro.id == null ) {
            create(_bairro);
            this.new();
        } else {
            update(_bairro);
            this.new();
        }

        $('#myModal').modal('hide')

    }

}]);