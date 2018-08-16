import React, { Component } from 'react';
import FormGroupGenerico from "../genericos/FormGroupGenerico";
import Cliente from '../../models/Cliente';
import $ from 'jquery';
import PubSub from 'pubsub-js';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListaCliente from './ListaCliente';

export class FormCliente extends Component{
    constructor (){
        super();
        this.state = {nome: '', sobrenome: '', rg: '', cpf: '', salario: ''};
        this.enviaFormCadastro = this.enviaFormCadastro.bind(this);
        this.setValue = this.setValue.bind(this)
    }

    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto">
                <div className="card">
                    <div className="card-header text-center bg-primary">
                        <h1 className = "text-white">Cadastro de cliente</h1>
                    </div>
                    <div className="card-body">
                        <form type = "POST" onSubmit = {this.enviaFormCadastro}>
                            <div className = "row">
                                <div className = "col-md-6">
                                    <FormGroupGenerico label = "Nome" name = "nome" id = "nome" value = {this.state.nome}  onChange = {this.setValue.bind(this, 'nome')} required = "true"/>
                                    <FormGroupGenerico label = "RG" id = "rg" type = "number" value = {this.state.rg} onChange = {this.setValue.bind(this, 'rg')} required = "true"/>
                                    <FormGroupGenerico label = "Salário" id = "salario" type = "number" step = "0.01" value = {this.state.salario} onChange = {this.setValue.bind(this, 'salario')} required = "true"/>
                                </div>
                                <div className = "col-md-6">
                                    <FormGroupGenerico label = "Sobrenome" id = "sobrenome" value = {this.state.sobrenome} onChange = {this.setValue.bind(this, 'sobrenome')} required = "true"/>
                                    <FormGroupGenerico label = "CPF" id = "cpf" type = "number" value = {this.state.cpf} onChange = {this.setValue.bind(this, 'cpf')} required = "true"/>
                                </div>
                            </div>
                            <div className = "form-group">
                                <button className = "btn btn-primary">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    setValue(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);           
    }

    enviaFormCadastro (evento){
        evento.preventDefault();
        let cliente = new Cliente();
        cliente.nome = this.state.nome;
        cliente.sobrenome = this.state.sobrenome;
        cliente.rg = this.state.rg;
        cliente.cpf = this.state.cpf;
        cliente.salario = parseFloat(this.state.salario.replace(',', '.'));
        $.ajax({
            url: 'http://10.0.1.32:8080/api_gerenciador_de_contas/webresources/cliente',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(cliente),
            success: function(response){
                this.setState({nome: '', sobrenome: '', rg: '', cpf: '', salario: ''});
                PubSub.publish('mensagem-erro-cadastro-cliente', null);
                PubSub.publish('cadastro-efetivado-cliente', response);
            }.bind(this),
            error: function(xhr,status,error){
                $("html, body").animate({ scrollTop: 0 }, "slow");
                PubSub.publish('mensagem-erro-cadastro-cliente', xhr.responseText);
            }
       });
       
    }
}

export default class ClienteBox extends Component{
    constructor(){
        super();
        this.state = {mensagemDeErro: null};
    }

    componentDidMount(){
        PubSub.subscribe('mensagem-erro-cadastro-cliente', function(channel, error){
            this.setState({mensagemDeErro: error});
        }.bind(this));
    }
    
    render(){
        var error_element = '';
        if(this.state.mensagemDeErro === null){
            error_element = '';
        }else{
            error_element = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.mensagemDeErro}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>);
        }

        return(
            <div>
                {error_element}
                <FormCliente/>
                <ListaCliente/>
            </div>
        );
    }
}