'use strict';

angular.module('myApp').factory('PromocaoService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'promocao';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deletePromocao,
        find: findPromocao,
        create: createPromocao,
        update: editPromocao
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
                    console.error('Erro ao recuperar lista de promocoes');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findPromocao(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de promocoes');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deletePromocao(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da promocao: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editPromocao(promocao){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, promocao).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da promocao: ' + promocao.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + promocao.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createPromocao(promocao){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, promocao).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova promocao: ' + promocao.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + promocao.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);
