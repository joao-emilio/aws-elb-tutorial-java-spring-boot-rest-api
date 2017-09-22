'use strict';

angular.module('myApp').factory('CidadeService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'cidade';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteCidade,
        find: findCidade,
        create: createCidade,
        update: editCidade
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
                    console.error('Erro ao recuperar lista de cidades');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findCidade(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de cidades');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteCidade(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da cidade: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editCidade(cidade){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, cidade).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da cidade: ' + cidade.codigo);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + cidade.codigo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createCidade(cidade){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cidade).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova cidade: ' + cidade.nome);
        }, function(errResponse) {
            console.error('Erro ao criar ' + cidade.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);