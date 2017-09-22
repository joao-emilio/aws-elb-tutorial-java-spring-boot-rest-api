'use strict';

angular.module('myApp').factory('ImagemService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    var REST_SERVICE_URI =  env.apiUrl + 'imagem';
    var REST_SERVICE_URI_FIND_ALL =  REST_SERVICE_URI + '/all';
    var imagesUrl = env.imagesUrl;

    var factory = {
        findAll: findAll,
        delete: deleteImagem,
        find: findImagem,
        create: createImagem,
        upload: upload,
        bulk: bulkUpload,
        getImagesUrl: getImagesUrl,
        update: editImagem
    };

    return factory;

    function getImagesUrl() {
        return imagesUrl;
    }

    function upload(fd) {
        var deferred = $q.defer();
        console.log("chamar http.post " + fd);
        //send the file / data to your server
        $http.post(REST_SERVICE_URI + '/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(err){
                console.error('Erro ao recuperar lista de imagems');
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }

    function findAll() {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI_FIND_ALL  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de imagems');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function findImagem(id) {
        var deferred = $q.defer();
        $http.get( REST_SERVICE_URI + "/" + id  )
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Erro ao recuperar lista de imagems');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteImagem(id){
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI + "/" + id).then(function(response) {
            deferred.resolve(response.data);
            console.log('Excluindo dados da imagem: ' + id);
        }, function(errResponse) {
            console.error('Erro ao excluir ' + id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }


    function editImagem(imagem){
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI, imagem).then(function(response) {
            deferred.resolve(response.data);
            console.log('Atualizando dados da imagem: ' + imagem.id);
        }, function(errResponse) {
            console.error('Erro ao atualizar ' + imagem.id);
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }

    function createImagem(imagem){
        var fd = new FormData();
        fd.append('file', imagem.file );
        console.log( "chamar upload: " + imagem.file );
        var promise = upload(fd);

        return promise;
    }

    function bulkUpload(imagens) {
        var promises = [];
        for( var index in imagens ) {
            var imagem = imagens[index];
            if(imagem.changed == true) {
                console.log( "chamar createImagem " + imagem );
                var promise = createImagem(imagem);
                promises.push( promise );
            } else {
                var deferred = $q.defer();
                deferred.resolve(imagem);
                promises.push( deferred.promise );
            }
        }
        return promises;
    }
}]);