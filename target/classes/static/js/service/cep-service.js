/**
 * Created by renat on 18/05/2017.
 */

angular.module('myApp').factory('CepService', ['$location','$http', '$q', function($location, $http, $q){

    var factory = {
        findCep: findCep
    };

    return factory;

    function findCep(cep) {
        var deferred = $q.defer();

        var WEB_SERVICE_URI =  'http://viacep.com.br/ws/' + cep + '/json/';

        $http.get( WEB_SERVICE_URI )
            .then(
                function (response) {
                    console.log('SUCCESS GET CEP : ' + WEB_SERVICE_URI);
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('ERROR GET CEP : ' + WEB_SERVICE_URI );
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;

    }
}]);