'use strict';

angular.module('myApp').factory('UserService', ['$location','$http', '$q', 'env', function($location, $http, $q, env){

    return {
        user: {
            id: '',
            nome: '',
            email: ''
        },
        update: function (user) {
            // Improve this method as needed
            this.user = user;
        }
    };

}]);