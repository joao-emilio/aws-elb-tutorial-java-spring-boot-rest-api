'use strict';

angular.module('myApp').factory('AgendaService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'agenda';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteAgenda,
        find: findAgenda,
        create: createAgenda,
        update: editAgenda
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
                    console.error('Erro ao recuperar lista de agendas');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findAgenda(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de agendas');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteAgenda(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados do agenda: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editAgenda(agenda){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, agenda).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados do agenda: ' + agenda.codigo);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + agenda.codigo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createAgenda(agenda){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, agenda).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando novo agenda: ' + agenda.nome);
        }, function(errResponse) {
            console.error('Erro ao criar ' + agenda.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);