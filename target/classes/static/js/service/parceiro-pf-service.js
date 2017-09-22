'use strict';

angular.module('myApp').factory('ParceiroPfService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'parceiro-pf';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';


    var factory = {
        findAll: findAll,
        delete: deleteParceiro,
        find: findParceiro,
        create: createParceiro,
        update: editParceiro
    };

    return factory;

    function findAll() {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI_FIND_ALL )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de parceiros');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findParceiro(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de parceiros');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteParceiro(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da parceiro: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editParceiro(parceiro){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, parceiro).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da parceiro: ' + parceiro.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + parceiro.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createParceiro(parceiro){
        var deferred = $q.defer();
            $http.post(REST_SERVICE_URI, parceiro).then(function(response) {
                deferred.resolve(response.data);
                console.log('criando novo parceiro: ' + parceiro.titulo);
            }, function(errResponse) {
                console.error('Erro ao criar ' + parceiro.titulo);
                deferred.reject(errResponse);
            });

        return deferred.promise;
    }
}]);
