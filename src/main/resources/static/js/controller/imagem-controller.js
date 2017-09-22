'use strict';

angular.module('myApp').controller('ImagemController', ['$scope', 'ImagemService', function($scope, ImagemService) {

    var self = this;
    $scope.imagem={id:null,nome:'',valor:'',descricao:''};

    findAll();

    $scope.new = function() {
        $scope.imagem = {};
        $scope.orig = angular.copy($scope.imagem);
        $scope.imagem = $scope.orig;
    }

    $scope.doUpload = function(){

        console.log('title',$scope.title);
        console.log('uploadFile',$scope.uploadFile);
        alert('Do upload. See console for data');
        //create form data object
        var fd = new FormData();
        fd.append('title',$scope.title);
        fd.append('file', $scope.uploadFile);

        ImagemService.upload( fd ).then( function(d) {
           alert('upload');
        });
    }

    $scope.delete = function (id) {
        ImagemService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        ImagemService.find(id).then(function(d) {
            $scope.imagem = d;
        });
    }

    function update(imagem) {
        ImagemService.update(imagem).then(function(d) {
            findAll();
        });
    }

    function create(imagem) {
        ImagemService.create(imagem).then(function(d) {
            findAll();
        });
    }

    function findAll() {
        ImagemService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_imagem) {
        if( _imagem.id == null ) {
            create(_imagem);
            this.new();
        } else {
            update(_imagem);
            this.new();
        }
    }

}]);