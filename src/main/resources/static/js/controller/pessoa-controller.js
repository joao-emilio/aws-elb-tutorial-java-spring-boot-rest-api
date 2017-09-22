'use strict';

angular.module('myApp').controller('PaisController', ['$scope', 'PaisService', function($scope, PaisService) {

    var self = this;
    $scope.pais={id:null,nome:'',valor:'',descricao:''};

    findAll();

    $scope.new = function() {
        $scope.pais = {};
        $scope.orig = angular.copy($scope.pais);
        $scope.pais = $scope.orig;
    }

    $scope.delete = function (id) {
        PaisService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        PaisService.find(id).then(function(d) {
            $scope.pais = d;
        });
    }

    function update(pais) {
        PaisService.update(pais).then(function(d) {
            findAll();
        });
    }

    function create(pais) {
        PaisService.create(pais).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        PaisService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_pais) {
        if( _pais.id == null ) {
            create(_pais);
            this.new();
        } else {
            update(_pais);
            this.new();
        }
    }

}]);