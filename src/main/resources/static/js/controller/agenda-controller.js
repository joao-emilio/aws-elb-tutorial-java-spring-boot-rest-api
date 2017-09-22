'use strict';

angular.module('myApp').controller('AgendaController', ['$scope', 'AgendaService', 'UserService', function($scope, AgendaService, UserService) {

    var self = this;
    $scope.agenda={id:null,nome:'',valor:'',descricao:''};

    findAll(UserService.user);

    $scope.new = function() {
        $scope.agenda = {};
        $scope.orig = angular.copy($scope.agenda);
        $scope.agenda = $scope.orig;
    }

    $scope.delete = function (id) {
        AgendaService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        AgendaService.find(id).then(function(d) {
            $scope.agenda = d;
        });
    }

    function update(agenda) {
        AgendaService.update(agenda).then(function(d) {
            findAll();
        });
    }

    function create(agenda) {

        AgendaService.create(agenda).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        AgendaService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_agenda) {
        if( _agenda.id == null ) {
            create(_agenda);
            this.new();
        } else {
            update(_agenda);
            this.new();
        }

        $('#myModal').modal('hide')

    }

}]);