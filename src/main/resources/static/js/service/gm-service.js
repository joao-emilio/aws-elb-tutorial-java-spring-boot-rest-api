'use strict';

angular.module('myApp').factory('GmService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'gruposmusculares';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteGm,
        find: findGm,
        create: createGm,
        update: editGm
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
                    console.error('Erro ao recuperar lista de gms');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findGm(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de gms');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteGm(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da gm: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editGm(gm){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, gm).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da gm: ' + gm.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + gm.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createGm(gm){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, gm).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova gm: ' + gm.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + gm.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);