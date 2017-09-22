'use strict';

angular.module('myApp').controller('ProdutoController'
            , ['$scope', '$q', 'ProdutoService', 'ImagemService', 'CategoriaProdutoService', 'env'
        , function($scope, $q, ProdutoService, ImagemService, CategoriaProdutoService, env) {

    var self = this;
    $scope.produto={id:null,nome:'',valor:'',descricao:'',imagemPrincipal:{id:null,changed:false,ready:false},imagens:[]};
    $scope.imagesUrl = env.imagesUrl;
    $scope.imagensPreview = ["../imgs/no-image.png","../imgs/no-image.png","../imgs/no-image.png"];
    var ready = false;
    $scope.produto.imagemPrincipal.changed = false;

    CategoriaProdutoService.findAll().then(function(d) {
        $scope.categorias = d;
    });

    findAll();
    var imagemPrincipal;

    $scope.change = function(imagem) {
        imagem.changed = true;
        imagem.id = null;
    }

    $scope.new = function() {
        $scope.produto={id:null,nome:'',valor:'',descricao:'',imagemPrincipal:{id:null,changed:false,ready:false},imagens:[]};
        $scope.imagens = [{id:null}, {id: null}, {id:null}];
        $scope.imagensPreview = ["../imgs/no-image.png","../imgs/no-image.png","../imgs/no-image.png"];

        angular.element('#imagemPrincipal').attr('src', '../imgs/no-image.png');
        angular.element('#imagem0').attr('src', '../imgs/no-image.png');
        angular.element('#imagem1').attr('src', '../imgs/no-image.png');
        angular.element('#imagem2').attr('src', '../imgs/no-image.png');

        $scope.orig = angular.copy($scope.produto);
        $scope.previewImage = null;
        $scope.previewImage0 = null;
        $scope.previewImage1 = null;
        $scope.previewImage2 = null;
        console.log("terminou chamada do metodo new");
    }

    $scope.delete = function (id) {
        ProdutoService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        angular.element('#imagemPrincipal').attr('src', '../imgs/no-image.png');
        angular.element('#imagem0').attr('src', '../imgs/no-image.png');
        angular.element('#imagem1').attr('src', '../imgs/no-image.png');
        angular.element('#imagem2').attr('src', '../imgs/no-image.png');

        $scope.previewImage = null;
        $scope.previewImage0 = null;
        $scope.previewImage1 = null;
        $scope.previewImage2 = null;

        ProdutoService.find(id).then(function(d) {
            $scope.produto = d;

            $scope.produto.imagemPrincipal.changed = false;
            $scope.previewImage = $scope.imagesUrl + d.imagemPrincipal.id;

            for( var i = 0; i < $scope.produto.imagens.length; i++ ) {
                $scope.temp = i;
                var preview = "imagensPreview" + $scope.temp;
                angular.element('#imagem' + i).attr('src', $scope.imagesUrl + $scope.produto.imagens[$scope.temp].id );
                //$scope[preview]= $scope.imagesUrl + $scope.produto.imagens[$scope.temp].id;
            }
        });
    }

    function update(produto) {
        console.log( "antes do bulk" );
        console.log( produto.imagens );
        var promises;
        if( produto.imagens ){
            promises = ImagemService.bulk( produto.imagens );
        }
        console.log( "depois do bulk" );
        console.log( produto.imagens );

        if(promises) {
            $q.all(promises).then(function (result) {
                console.log('then ' + result);
                produto.imagens = [];
                result.forEach(function (imagem, index) {
                    console.log( "imagem" );
                    console.log(  imagem );
                    produto.imagens[index] = imagem;
                });
                updateProduto(produto);
            }, function (reason) {
                console.log('reason: ' + reason);
            });
        } else {
            updateProduto(produto);
        }

    }

    function updateProduto( produto ) {
        console.log("chamando updateProduto");
        if( produto.imagemPrincipal.changed == true ) {
            console.log("imagemPrincipal foi alterada");
            ImagemService.create(produto.imagemPrincipal).then(function (imagem) {
                produto.imagemPrincipal = imagem;
                console.log(produto);
                ProdutoService.update(produto).then(function(d) {
                    findAll();
                });
            }, function (reason) {
                console.log('produtoService.update - reason: ' + reason);
            });
        } else {
            ProdutoService.update(produto).then(function(d) {
                findAll();
            });
        }
    }

    function create(produto) {
        console.log( produto.imagens );
        var promises;
        if( produto.imagens ){
            promises = ImagemService.bulk( produto.imagens );
        }

        if(promises) {
            $q.all(promises).then(function (result) {
                console.log('then ' + result);
                produto.imagens = [];
                result.forEach(function (imagem, index) {
                    produto.imagens[index] = imagem;
                });
                createProduto(produto);
            }, function (reason) {
                console.log('reason: ' + reason);
            });
        } else {
            createProduto(produto);
        }
    }

    function createProduto(produto) {
        console.log("chamando createProduto");
        if( produto.imagemPrincipal.changed == true ) {
            console.log("imagemPrincipal foi alterada");
            ImagemService.create(produto.imagemPrincipal).then(function (imagem) {
                produto.imagemPrincipal = imagem;
                console.log(produto);
                ProdutoService.create(produto).then(function () {
                    findAll();
                });
            }, function (reason) {
                console.log('produtoService.create - reason: ' + reason);
            });
        } else {
            produto.imagemPrincipal = null;
            ProdutoService.create(produto).then(function () {
                findAll();
            });
        }
    }

    function findAll() {
        ProdutoService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_produto) {
        if( _produto.id == null ) {
            create(_produto);
            //this.new();
        } else {
            update(_produto);
            //this.new();
        }
        $('#myModal').modal('hide')
    }

}]);