import React, { Component } from 'react';
import FormBuscaCliente from './FormBuscaCliente';
import ListaCliente from './ListaCliente';
import FormEditaCliente from './FormEditaCliente';
import PubSub from 'pubsub-js';


export default class GerenciamentoClienteBox extends Component{

    constructor(){
        super();
        this.state = {
            renderizaFormEditaCliente: !true,
        };
    }

    render(){
        return (
            <div>
                <FormEditaCliente renderizado = {this.state.renderizaFormEditaCliente}/>
                <FormBuscaCliente/>
                <ListaCliente/>
            </div>
        );
    }

    componentDidMount(){
        PubSub.subscribe('fecha-form-edicao-cliente', function(channel){
            this.setState({renderizaFormEditaCliente: !false});
        }.bind(this));
    }


}
