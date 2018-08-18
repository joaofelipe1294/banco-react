import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Cliente from '../../models/Cliente';
import FormGroupGenerico from '../genericos/FormGroupGenerico';
import { Server_IP } from '../../constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class FormEditaCliente extends Component{

    constructor(){
        super();
        this.setValue = this.setValue.bind(this);
        this.enviaFormEdicao = this.enviaFormEdicao.bind(this);
        this.state = {
            nome: '', 
            sobrenome: '', 
            rg: '', 
            cpf: '', 
            salario: '', 
            clienteId: ''
        };
    }

    render(){
        return(
            <div className = "col-md-9 mt-4 mx-auto" hidden = {this.props.renderizado}>
                <div className="card">
                    <div className="card-header text-center bg-warning">
                        <div className = "d-flex">
                            <div className = "p-2">
                                <h1 className = "text-white">Edição de cliente</h1>
                            </div>
                            <div className = "ml-auto p-2d">
                                <button className = "btn btn-dark" onClick = {this.fechaPainelEdicao}>
                                    <FontAwesomeIcon icon="times"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form type = "POST" onSubmit = {this.enviaFormEdicao}>
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
                                <button className = "btn btn-warning text-white">Editar</button>
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

    componentWillMount(){
        PubSub.subscribe('prepara-edicao-de-cliente', function(channel, cliente){
            this.setState({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                rg: cliente.rg,
                cpf: cliente.cpf,
                salario: cliente.salario,
                clienteId: cliente.clienteId
            });
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }.bind(this));
    }

    fechaPainelEdicao(){
        PubSub.publish('fecha-form-edicao-cliente', {});
    }

    enviaFormEdicao (evento){
        evento.preventDefault();
        let cliente = new Cliente();
        cliente.clienteId = this.state.clienteId;
        cliente.nome = this.state.nome;
        cliente.sobrenome = this.state.sobrenome;
        cliente.rg = this.state.rg;
        cliente.cpf = this.state.cpf;
        cliente.salario = parseFloat(String(this.state.salario).replace(',', '.'));
        $.ajax({
            url: 'http://' + Server_IP + ':8080/api_gerenciador_de_contas/webresources/cliente',
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(cliente),
            success: function(response){
                this.setState({nome: '', sobrenome: '', rg: '', cpf: '', salario: ''});
                PubSub.publish('mensagem-erro-cadastro-cliente', null);
                PubSub.publish('edicao-efetivada-cliente', response);
                this.fechaPainelEdicao();
            }.bind(this),
            error: function(xhr,status,error){
                $("html, body").animate({ scrollTop: 0 }, "slow");
                PubSub.publish('mensagem-erro-cadastro-cliente', xhr.responseText);
            }
       });
    }
}