'use strict';

angular.module('myApp').factory('NoticiaService', ['$location','$http', '$q', function($location, $http, $q){

    var REST_SERVICE_URI =  env.apiUrl + 'noticias';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';

    var factory = {
        findAll: findAll,
        delete: deleteNoticia,
        find: findNoticia,
        create: createNoticia,
        update: editNoticia
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
                    console.error('Erro ao recuperar lista de noticias');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findNoticia(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de noticias');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteNoticia(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da noticia: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editNoticia(noticia){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, noticia).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da noticia: ' + noticia.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + noticia.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createNoticia(noticia){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, noticia).then(function(response) {
            deferred.resolve(response.data);
            console.log('criando nova noticia: ' + noticia.titulo);
        }, function(errResponse) {
            console.error('Erro ao criar ' + noticia.titulo);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);