'use strict';

angular.module('myApp').controller('ServicoController', ['$scope', 'ServicoService', function($scope, ServicoService) {

    var self = this;
    $scope.servico={id:null,nome:'',valor:'',descricao:''};

    findAll();

    $scope.new = function() {
        $scope.servico = {};
        $scope.orig = angular.copy($scope.servico);
        $scope.servico = $scope.orig;
    }

    $scope.delete = function (id) {
        ServicoService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        ServicoService.find(id).then(function(d) {
            $scope.servico = d;
        });
    }

    function update(servico) {
        ServicoService.update(servico).then(function(d) {
            findAll();
        });
    }

    function create(servico) {
        ServicoService.create(servico).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        ServicoService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    function reset(){
            $scope.submitted = false;
            $scope.servico={id:null,nome:'',valor:'',descricao:''};
            $scope.defaultFormData = angular.copy($scope.resetCopy);
            $scope.myForm.$setPristine(); // reset Form
            $scope.myForm.$setValidity();
            $scope.myForm.$setUntouched();
        }

    $scope.submit = function(_servico) {
        $scope.submitted = true;
        if ($scope.servico.nome == false || $scope.servico.valor == false){
            console.log('FIELD.ERROR');
        } else {
            if( _servico.id == null ) {
                create(_servico);
                this.new();
                reset();
            } else {
                update(_servico);
                this.new();
            }
        }
    }

}]);