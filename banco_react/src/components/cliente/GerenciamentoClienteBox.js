import React, { Component } from 'react';
import FormBuscaCliente from './FormBuscaCliente';
import ListaCliente from './ListaCliente';
import FormEditaCliente from './FormEditaCliente';
import PubSub from 'pubsub-js';


export default class GerenciamentoClienteBox extends Component{

    constructor(){
        super();
        this.state = {
            renderizaFormEditaCliente: !false,
            renderizaFormBuscaCliente: !true,
        };
    }

    render(){
        return (
            <div>
                <FormEditaCliente renderizado = {this.state.renderizaFormEditaCliente}/>
                <FormBuscaCliente renderizado = {this.state.renderizaFormBuscaCliente}/>
                <ListaCliente/>
            </div>
        );
    }

    componentDidMount(){
        PubSub.subscribe('fecha-form-edicao-cliente', function(channel){
            this.setState({
                renderizaFormEditaCliente: !false,
                renderizaFormBuscaCliente: !true,
            });
        }.bind(this));
        PubSub.subscribe('prepara-edicao-cliente', function(channel, clienteJson){
            this.setState({
                renderizaFormEditaCliente: !true,
                renderizaFormBuscaCliente: !false,
            });
        }.bind(this));
    }


}
