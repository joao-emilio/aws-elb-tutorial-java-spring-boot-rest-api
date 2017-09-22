'use strict';
var env = {};

// Import variables if present (from env.js)
if(window){
    if(window.__env) {
        Object.assign(env, window.__env);
    } else {
        alert('Arquivo de ambiente não foi carregado corretamente.')
    }
}

var app = angular.module('myApp', ['ngMessages','bootstrap.fileField','ngMaterial'] );

// Register environment in AngularJS as constant

app.constant('env', env);

app.directive('imageonload', function() {
           return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                   element.bind('load', function() {
                       //call the function that was passed
                       scope.$apply(attrs.imageonload);
                   });
               }
           };
       });

app.directive("phoneDir", PhoneDir);
function PhoneDir() {
    return {
        link : function(scope, element, attrs) {
            var options = {
                onKeyPress: function(val, e, field, options) {
                    putMask();
                }
            }

            $(element).mask('(00) 00000-0000', options);

            function putMask() {
                var mask;
                var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
                if(cleanVal.length > 10) {//verifica a quantidade de digitos.
                    mask = "(00) 00000-0000";
                } else {
                    mask = "(00) 0000-00009";
                }
                $(element).mask(mask, options);//aplica a mascara novamente
            }
        }
    }
}

app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);
