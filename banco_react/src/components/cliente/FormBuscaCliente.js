import React, { Component } from 'react';
import FormGroupBuscaGenerico from './../genericos/FormGroupBuscaGenerico';
import { Server_IP } from '../../../src/constantes';
import $ from 'jquery';
import PubSub from 'pubsub-js';


export default class FormBuscaCliente extends Component{

    constructor(){
        super();
        this.state = {
            nomeCliente: '',
        };
        this.buscaPorNome = this.buscaPorNome.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto" hidden = {this.props.renderizado}>
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Buscar cliente</h1>
                    </div>
                    <div className="card-body">
                        <FormGroupBuscaGenerico 
                            label= "Busca por Nome." 
                            value = {this.state.nomeCliente} 
                            onChange = {this.setValue.bind(this, 'nomeCliente')}
                            type = "text" 
                            onClick = {this.buscaPorNome}
                        />
                        <FormGroupBuscaGenerico label= "Busca por Sobrenome." type = "text"/>
                        <FormGroupBuscaGenerico label= "Busca por RG." type = "number"/>
                        <FormGroupBuscaGenerico label= "Busca por CPF." type = "number"/>
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

    buscaPorNome(event){
        event.preventDefault();
        let url = 'http://' + Server_IP + ':8080/api_gerenciador_de_contas/webresources/cliente';
        if(this.state.nomeCliente !== ''){
            url = 'http://' + Server_IP + ':8080/api_gerenciador_de_contas/webresources/cliente/busca/nome/' + this.state.nomeCliente;
        }
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(listaAtualizada){
                PubSub.publish('atualizar-lista-cliente', listaAtualizada);    
            }.bind(this),
            error: function(xhr,status,error){
                alert('Não foi possível listar os clientes listados.');
            }
        });
    }

}

