import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Cliente from '../../models/Cliente';
import FormGroupGenerico from '../genericos/FormGroupGenerico';
import { Server_IP } from '../../constantes';


export default class FormEditaCliente extends Component{

    constructor(){
        super();
        this.setValue = this.setValue.bind(this);
        this.state = {nome: '', sobrenome: '', rg: '', cpf: '', salario: ''};
    }

    render(){
        return(
            <div className = "col-md-9 mt-4 mx-auto">
                <div className="card">
                    <div className="card-header text-center bg-warning">
                        <h1 className = "text-white">Edição de cliente</h1>
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

    componentDidMount(){
        PubSub.subscribe('prepara-edicao-de-cliente', function(channel, cliente){
            this.setState({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                rg: cliente.rg,
                cpf: cliente.cpf,
                salario: cliente.salario
            });
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }.bind(this));
    }

}