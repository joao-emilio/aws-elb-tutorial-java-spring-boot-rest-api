'use strict';

angular.module('myApp').factory('PaisService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'pais';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deletePais,
        find: findPais,
        create: createPais,
        update: editPais
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
                    console.error('Erro ao recuperar lista de pais');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findPais(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de pais');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deletePais(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da pais: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editPais(pais){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, pais).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da pais: ' + pais.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + pais.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createPais(pais){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, pais).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova pais: ' + pais.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + pais.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);
