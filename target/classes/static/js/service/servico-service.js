'use strict';

angular.module('myApp').factory('ServicoService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'servicos';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteServico,
        find: findServico,
        create: createServico,
        update: editServico
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
                    console.error('Erro ao recuperar lista de servicos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findServico(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de servicos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteServico(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da servico: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editServico(servico){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, servico).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da servico: ' + servico.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + servico.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createServico(servico){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, servico).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova servico: ' + servico.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + servico.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);