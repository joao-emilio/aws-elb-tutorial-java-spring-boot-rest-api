'use strict';

angular.module('myApp').factory('EndederecoService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'endereco';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteEndedereco,
        find: findEndedereco,
        create: createEndedereco,
        update: editEndedereco
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
                    console.error('Erro ao recuperar lista de enderecos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findEndedereco(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de enderecos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteEndedereco(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da endereco: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editEndedereco(endereco){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, endereco).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados endereco: ' + endereco.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + endereco.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createEndedereco(endereco){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, endereco).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando endereco: ' + endereco.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + endereco.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);