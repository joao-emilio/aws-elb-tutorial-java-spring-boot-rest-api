/**
 * Created by Kauê Bentes on 05/05/2017.
 */
'use strict';

angular.module('myApp').controller('ParceiroPfController', ['ParceiroPfService', 'CepService','$scope', function(ParceiroPfService, CepService, $scope) {

    var self = this;
    var parceiro = {};

    findAll();

    $scope.new = function() {
        $scope.parceiro = {
            endereco : {
                "pais" : {},
                "estado" : {},
                "cidade" : {},
                "bairro" : {},
                "logradouro" : "",
                "cep" : ""
            },
            "id":null,
            "tipoPessoa":"",
            "nome":"",
            "responsavel":"",
            "email":"",
            "telefone":"",
            "cnpj":"",
            "cpf":""
        };
        $scope.orig = angular.copy($scope.parceiro);
        $scope.parceiro = $scope.orig;
    }

    $scope.delete = function (id) {
        ParceiroPfService.delete(id).then(function(d) {
            findAll();
        });
    }

    $scope.edit = function(id) {
        ParceiroPfService.find(id).then(function(d) {
            $scope.parceiro = d;
        });
    }

    $scope.changeHandler = function(cep) {
        if(cep.length == 8 ) {
            CepService.findCep(cep).then(function (d) {
                if (d.erro == true) {
                    console.log("CEP não existe:  " + cep);
                } else {
                    console.log("CEP existe:  " + cep);
                    $scope.parceiro.endereco.estado.uf = d.uf;
                    $scope.parceiro.endereco.cidade.nome = d.localidade;
                    $scope.parceiro.endereco.bairro.nome = d.bairro;
                    $scope.parceiro.endereco.logradouro = d.logradouro;
                }
            });
        }
    };

    function update(parceiro) {
        ParceiroPfService.update(parceiro).then(function(d) {
            $('#myModal').modal('hide');
            findAll();
        });
    }

    function create(parceiro) {
        ParceiroPfService.create(parceiro).then(function(d) {
            findAll();
        });
    }

    function findAll() {
       ParceiroPfService.findAll().then(function(d) {
           $scope.lista = d;
        });
    }


    function reset(){
        $scope.submitted = false;
        $scope.parceiro={id:null,tipo:'',nome:'',responsavel:'',email:'',telefone:'',cpfcnpj:'',rua:'',numero:'',bairro:'',cidade:'',estado:'',pais:''};
        $scope.defaultFormData = angular.copy($scope.resetCopy);
        $scope.myForm.$setPristine(); // reset Form
        $scope.myForm.$setValidity();
        $scope.myForm.$setUntouched();
    }

    $scope.submit = function(_parceiro) {
        $scope.submitted = true;
        if ($scope.parceiro.nome == undefined || $scope.parceiro.responsavel == undefined || $scope.parceiro.email == undefined || $scope.parceiro.telefone == undefined){
            console.log('FIELD.ERROR');
        } else {
            if( _parceiro.id == null ) {
                create(_parceiro);
                this.new();
                reset();
            } else {
                update(_parceiro);
                this.new();
            }
        }
    }


}]);