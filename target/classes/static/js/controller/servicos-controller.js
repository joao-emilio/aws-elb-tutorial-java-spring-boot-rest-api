/**
 * Created by renat on 25/04/2017.
 */
'use strict';

angular.module('myApp').controller('ServicosController', ['$location', '$scope', '$http', '$q', '$interval' , function($location, $scope, $http, $q, $interval) {

    $scope.init = function () {
        find();
    };

    $interval(function () {
        find();
    }, 1000);

    var _baseUrl = $location.$$protocol + '://' + $location.$$host;
    var REST_SERVICE_URI =  _baseUrl + '/services/servicos/';

    function find() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "all").then(function(response) {
            deferred.resolve(response.data);
            $scope.servicos = response.data;
        }, function(errResponse) {
            console.error('Erro');
            deferred.reject(errResponse);
        });
        return deferred.promise;
    }
}]);