'use strict';

angular.module('myApp').factory('CategoriaProdutoService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'categoria';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteCategoriaProduto,
        find: findCategoriaProduto,
        create: createCategoriaProduto,
        update: editCategoriaProduto
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
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findCategoriaProduto(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteCategoriaProduto(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
        }, function(errResponse) {
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editCategoriaProduto(categoriaProduto){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, categoriaProduto).then(function(response) {
            deferred.resolve(response.data);
        }, function(errResponse) {
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createCategoriaProduto(categoriaProduto){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, categoriaProduto).then(function(response) {
            deferred.resolve(response.data);
        }, function(errResponse) {
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);