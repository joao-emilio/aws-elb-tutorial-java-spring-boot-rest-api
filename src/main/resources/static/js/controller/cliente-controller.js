'use strict';

/*
*@author renatocesar
* 04/28/2017
*
*
*/

angular.module('myApp').controller('ClienteController', ['ClienteService', 'EnderecoService', 'CepService','$scope', function(ClienteService, EnderecoService, CepService, $scope) {

    var self = this;
    var cliente = {};
    var endereco = [];

    findAll();

    $scope.new = function() {
        $scope.cliente = {
            "id":null, "nome":"", "email":"", "telefone":"", "celular":"", "dataNascimento":"", "cpf":"",
            "idade":"", "genero":"", "peso":"", "altura":"", "tamanhoCamisa":"", "tamanhoCalcado":"", "dataCadastro":""};

        $scope.cliente.endereco = [{"id":null, "entidade": {}, "pais" : {}, "estado" : {}, "cidade" : {}, "bairro" : {}, "logradouro" : "", "cep": ""}];

        $scope.orig = angular.copy($scope.cliente);
        $scope.cliente = $scope.orig;
    }

    $scope.changeHandler = function(cep) {
        if( cep.length == 8 ) {

            CepService.findCep(cep).then(function (d) {
                if (d.erro == true) {
                    console.log("CEP não existe:  " + cep);
                } else {
                    console.log("CEP existe:  " + cep);
                    $scope.cliente.endereco.estado.uf = d.uf;
                    $scope.cliente.endereco.cidade.nome = d.localidade;
                    $scope.cliente.endereco.bairro.nome = d.bairro;
                    $scope.cliente.endereco.logradouro = d.logradouro;
                }
            });
        }
    };

    $scope.delete = function (id) {
        ClienteService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        ClienteService.find(id).then(function(d) {
            $scope.cliente = d;
        });
    }

    function update(cliente) {
        ClienteService.update(cliente).then(function(d) {
            findAll();
        });
    }

    function create(cliente) {
        ClienteService.create(cliente).then(function(d) {
            findAll();
            EnderecoService.createEndereco(d.endereco);
        });
    }

    function findAll() {
        ClienteService.findAll().then(function(d) {
            $scope.lista = d;
        });
    }

    $scope.submit = function(_cliente) {
        if( _cliente.id == null ) {
            create(_cliente);
        } else {
            update(_cliente);
        }
        $('#myModal').modal('hide');
    }

}]);