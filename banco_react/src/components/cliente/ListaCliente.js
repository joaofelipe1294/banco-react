import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Server_IP } from '../../../src/constantes';
import Cliente from '../../models/Cliente';


export default class ListaCliente extends Component{

    constructor(){
        super();
        this.state = {listaClientes: []};
    }

    render(){
        return (
            <div className = "col-md-11 mt-4 mx-auto">
                <table className = "table table-striped">
                    <thead className = "thead-dark">
                        <tr>
                            <th className = "d-none d-md-block" id = "colunaNome">
                                <h3>Nome</h3>
                            </th>
                            <th id = "colunaSobrenome">
                                <h3>Sobrenome</h3>
                            </th>
                            <th className = "d-none d-md-block">
                                <h3>RG</h3>
                            </th>
                            <th>
                                <h3>CPF</h3>
                            </th>
                            <th className = "d-none d-md-block" id = "colunaSalario">
                                <h3>Salário</h3>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaClientes.map(function(cliente) {
                            return(
                                <tr key = {cliente.clienteId}>
                                    <td className = "d-none d-md-block">{cliente.nome}</td>
                                    <td>{cliente.sobrenome}</td>
                                    <td className = "d-none d-md-block">{cliente.rg}</td>
                                    <td>{cliente.cpf}</td>
                                    <td className = "d-none d-md-block">{cliente.salario}</td>
                                    <td>
                                        <button id = {'cliente_' + cliente.clienteId} className = "btn btn-warning" data = {JSON.stringify(cliente)} onClick = {this.preparaClienteParaEdicao}>
                                            <FontAwesomeIcon icon="edit" className = "text-white" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            </div>
        );    
    }

    componentDidMount(){
        $.ajax({
            url: 'http://' + Server_IP + ':8080/api_gerenciador_de_contas/webresources/cliente',
            type: 'GET',
            dataType: 'json',
            success: function(listaAtualizada){
                this.setState({listaClientes: listaAtualizada});         
            }.bind(this),
            error: function(xhr,status,error){
                alert('Não foi possível listar os clientes listados.');
            }
        });
        PubSub.subscribe('cadastro-efetivado-cliente', function(channel, novaListaClientes){
            this.setState({listaClientes: novaListaClientes});
        }.bind(this));
        PubSub.subscribe('edicao-efetivada-cliente', function(channel, novaListaClientes){
            this.setState({listaClientes: novaListaClientes});
        }.bind(this));
        $('#colunaNome').click(function(){
            this.buscaListaOrdenada('nome');
        }.bind(this));
        $('#colunaSobrenome').click(function(){
            this.buscaListaOrdenada('sobrenome');
        }.bind(this));
        $('#colunaSalario').click(function(){
            this.buscaListaOrdenada('salario');
        }.bind(this));
    }

    preparaClienteParaEdicao(evento){
        evento.preventDefault();
        let elementoClicado = evento.target;
        if(elementoClicado.tagName === 'svg')
            elementoClicado = evento.target.parentNode;
        else if(elementoClicado.tagName === 'path')
            elementoClicado = evento.target.parentNode.parentNode;
        let cliente = $('#' + elementoClicado.getAttribute('id')).attr('data');
        let clienteJson = JSON.parse(cliente);
        clienteJson = Object.assign(new Cliente(), clienteJson);
        PubSub.publish('prepara-edicao-de-cliente', clienteJson);
    }

    buscaListaOrdenada(criterio){
        $.ajax({
            url: 'http://' + Server_IP + ':8080/api_gerenciador_de_contas/webresources/cliente/' + criterio,
            type: 'GET',
            dataType: 'json',
            success: function(listaAtualizada){
                this.setState({listaClientes: listaAtualizada});         
            }.bind(this),
            error: function(xhr,status,error){
                alert('Não foi possível listar os clientes listados.');
            }
        });
    }
}