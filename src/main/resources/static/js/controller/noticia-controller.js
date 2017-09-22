'use strict';

angular.module('myApp').controller('NoticiaController', ['NoticiaService','$scope', function(NoticiaService, $scope) {
    var self = this;
    var noticia = {"id":"", "titulo":"", "descricao":"", "urlNoticia":"", "urlThumbnail":""};

    $scope.new = function() {
        $scope.noticia = {};
        $scope.orig = angular.copy($scope.noticia);
        $scope.noticia = $scope.orig;
    }

    findAll();

    $scope.delete = function (id) {
        NoticiaService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        NoticiaService.find(id).then(function(d) {
            $scope.noticia = d;
        });
    }

    function update(noticia) {
        NoticiaService.update(noticia).then(function(d) {
            $('#myModal').modal('hide');
            findAll();
        });
    }

    function create(noticia) {
        NoticiaService.create(noticia).then(function(d) {
            $('#myModal').modal('hide');
            findAll();
        });
    }

    function findAll() {
        NoticiaService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_noticia) {
        if( _noticia.id == null ) {
            create(_noticia);
        } else {
            update(_noticia);
        }
    }
}]);