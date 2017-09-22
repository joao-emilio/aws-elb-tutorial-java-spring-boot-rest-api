/**
 * Created by Kauê Bentes on 05/05/2017.
 */
'use strict';

angular.module('myApp').controller('PromocaoController', ['PromocaoService', 'ProdutoService', '$scope', function(PromocaoService,ProdutoService,$scope) {

    var self = this;
    findAll();

    ProdutoService.findAll().then(function(d) {
            $scope.produtos = d;
        });

    $scope.new = function() {
        $scope.promocao = {"id":null,"titulo":"","valor":"","descricao":"","produto":{"id":null}};
        $scope.orig = angular.copy($scope.promocao);
        $scope.promocao = $scope.orig;
    }

    $scope.delete = function (id) {
        PromocaoService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        PromocaoService.find(id).then(function(d) {
            $scope.promocao = d;
        });
    }

    function update(promocao) {
        PromocaoService.update(promocao).then(function(d) {
            findAll();
            $('#myModal').modal('hide');
        });
    }

    function create(promocao) {
        PromocaoService.create(promocao).then(function(d) {
            findAll();
            $('#myModal').modal('hide');
        });
    }

    function findAll() {
        PromocaoService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }


    function reset(){
        $scope.submitted = false;
        $scope.promocao={id:null, titulo:'',descricao:'',valor:''};
        $scope.defaultFormData = angular.copy($scope.resetCopy);
        $scope.myForm.$setPristine(); // reset Form
        $scope.myForm.$setValidity();
        $scope.myForm.$setUntouched();
    }

    $scope.submit = function(_promocao) {
        $scope.submitted = true;
        console.log($scope.promocao.produto)
        if ($scope.promocao.produto.id == undefined || $scope.promocao.titulo == undefined || $scope.promocao.descricao == undefined || $scope.promocao.valor == undefined){
            console.log('FIELD.ERROR');
        } else {
            if( _promocao.id == null ) {
                create(_promocao);
                this.new();
                reset();
            } else {
                update(_promocao);
                this.new();
            }
        }
    }


}]);