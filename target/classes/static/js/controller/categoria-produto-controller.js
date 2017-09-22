'use strict';

angular.module('myApp').controller('CategoriaProdutoController'
        ,['$scope', 'CategoriaProdutoService', 'ImagemService'
        , function($scope, CategoriaProdutoService, ImagemService) {

    var self = this;
    $scope.categoriaProduto={id:null,nome:'',descricao:'',imagem:{}};

    CategoriaProdutoService.findAll().then(function(d) {
        $scope.categorias = d;
    });

    findAll();

    $scope.categoriaProduto.imagem.changed = false;

    $scope.change = function(imagem) {
        imagem.changed = true;
        imagem.id = null;
    }

    $scope.new = function () {
        $scope.previewImage = null;
        angular.element('#imagem').attr('src', '../imgs/no-image.png');
    }

    $scope.delete = function (id) {
        CategoriaProdutoService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        angular.element('#imagem').attr('src', '../imgs/no-image.png');
        $scope.previewImage = null;

        CategoriaProdutoService.find(id).then(function(d) {
            $scope.categoriaProduto = d;
            $scope.categoriaProduto.imagem.changed = false;
            $scope.previewImage = ImagemService.getImagesUrl() + d.imagem.id;
        });
    }

    function update(categoriaProduto) {
        console.log("chamando update");
        if( categoriaProduto.imagem.changed == true ) {
            console.log("imagem foi alterada");
            ImagemService.create(categoriaProduto.imagem).then(function (imagem) {
                categoriaProduto.imagem = imagem;
                console.log(categoriaProduto);
                CategoriaProdutoService.update(categoriaProduto).then(function(d) {
                    findAll();
                });
            }, function (reason) {
                console.log('categoriaProdutoService.update - reason: ' + reason);
            });
        } else {
            CategoriaProdutoService.update(categoriaProduto).then(function(d) {
                findAll();
            });
        }
    }

    function create(categoriaProduto) {
        ImagemService.create(categoriaProduto.imagem).then( function (_imagem) {
            categoriaProduto.imagem = _imagem;
            CategoriaProdutoService.create(categoriaProduto).then(function(d) {
                findAll();
            });

        })
    }

    function findAll() {
        CategoriaProdutoService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_categoriaProduto) {
        $scope.submitted = true;
        if( _categoriaProduto.id == null ) {
            create(_categoriaProduto);
        } else {
            update(_categoriaProduto);
        }
        $('#myModal').modal('hide')
    }

}]);