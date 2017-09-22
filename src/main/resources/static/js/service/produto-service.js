'use strict';

angular.module('myApp').factory('ProdutoService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'produto';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteProduto,
        find: findProduto,
        create: createProduto,
        update: editProduto
    };

    return factory;

    function findAll() {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI_FIND_ALL  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de produtos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findProduto(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de produtos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteProduto(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da produto: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editProduto(produto){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, produto).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da produto: ' + produto.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + produto.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createProduto(produto){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, produto).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova produto: ' + produto.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + produto.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);