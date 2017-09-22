'use strict';

angular.module('myApp').factory('EstadoService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'estado';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteEstado,
        find: findEstado,
        findByNome: findByNome,
        create: createEstado,
        update: editEstado

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
                    console.error('Erro ao recuperar lista de estados');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findEstado(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de estados');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }
    
    function findByNome(nome) {
        console.log('procurando estado pelo nome: ' + nome)
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/find/" + nome  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar estado');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteEstado(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da estado: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editEstado(estado){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, estado).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da estado: ' + estado.codigo);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + estado.codigo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createEstado(estado){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, estado).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando novo estado: ' + estado.nome);
        }, function(errResponse) {
            console.error('Erro ao criar: ' + estado.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);