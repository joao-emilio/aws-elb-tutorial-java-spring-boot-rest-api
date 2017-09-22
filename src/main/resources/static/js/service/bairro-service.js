'use strict';

angular.module('myApp').factory('BairroService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'bairro';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteBairro,
        find: findBairro,
        create: createBairro,
        update: editBairro
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
                    console.error('Erro ao recuperar lista de bairros');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findBairro(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de bairros');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteBairro(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados do bairro: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editBairro(bairro){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, bairro).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados do bairro: ' + bairro.codigo);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + bairro.codigo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createBairro(bairro){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, bairro).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando novo bairro: ' + bairro.nome);
        }, function(errResponse) {
            console.error('Erro ao criar ' + bairro.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);