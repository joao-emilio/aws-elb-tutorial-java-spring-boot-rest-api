'use strict';

angular.module('myApp').factory('PessoaService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'pessoa';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deletePessoa,
        find: findPessoa,
        create: createPessoa,
        update: editPessoa
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
                    console.error('Erro ao recuperar lista de pessoas');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findPessoa(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de pessoas');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deletePessoa(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da pessoa: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editPessoa(pessoa){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, pessoa).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da pessoa: ' + pessoa.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + pessoa.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createPessoa(pessoa){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, pessoa).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova pessoa: ' + pessoa.nome);
        }, function(errResponse) {
            console.error('Erro ao criar ' + pessoa.nome);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);