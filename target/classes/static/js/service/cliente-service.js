'use strict';

angular.module('myApp').factory('ClienteService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'cliente';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteCliente,
        find: findCliente,
        create: createCliente,
        update: editCliente
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
                    console.error('Erro ao recuperar lista de clientes');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findCliente(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de clientes');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteCliente(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados do cliente: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editCliente(cliente){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, cliente).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados do cliente: ' + cliente.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + cliente.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createCliente(cliente){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cliente).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando novo cliente: ' + cliente.nome);
        }, function(errResponse) {
            console.error('Erro ao criar ' + cliente.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);
