'use strict';

angular.module('myApp').controller('GmController', ['$scope', 'GmService', function($scope, GmService) {

    var self = this;
    $scope.gm={id:null,nome:'',descricao:''};

    findAll();

    $scope.new = function() {
        $scope.gm = {};
        $scope.orig = angular.copy($scope.gm);
        $scope.gm = $scope.orig;
    }

    $scope.delete = function (id) {
        GmService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        GmService.find(id).then(function(d) {
            $scope.gm = d;
        });
    }

    function update(gm) {
        GmService.update(gm).then(function(d) {
            findAll();
        });
    }

    function create(gm) {
        GmService.create(gm).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        GmService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    function reset(){
        $scope.submitted = false;
        $scope.gm={id:null,nome:'',descricao:''};
        $scope.defaultFormData = angular.copy($scope.resetCopy);
        $scope.myForm.$setPristine(); // reset Form
        $scope.myForm.$setValidity();
        $scope.myForm.$setUntouched();
    }

    $scope.submit = function(_gm) {
        $scope.submitted = true;

        if ($scope.gm.nome == false || $scope.gm.descricao == false){
            alert($scope.gm.nome);
            alert($scope.gm.descricao);
            console.log('FIELD.ERROR');
        } else {
            if( _gm.id == null ) {
                alert($scope.gm.nome);
                alert($scope.gm.descricao);
                create(_gm);
                this.new();
                reset();
            } else {
                update(_gm);
                this.new();
            }
        }

    }

}]);