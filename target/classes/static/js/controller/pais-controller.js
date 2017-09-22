'use strict';

/*
*@author renatocesar
* 05/17/2017
*/

angular.module('myApp').controller('PaisController', ['PaisService','$scope', function(PaisService, $scope) {

    var self = this;

    var pais = {
        "codigo":"",
        "nome":"",
    };

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
            $('#myModal').modal('hide');
            findAll();
        });
    }

    function create(pais) {
        PaisService.create(pais).then(function(d) {
            $('#myModal').modal('hide');
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
        } else {
            update(_pais);
        }
    }

}]);