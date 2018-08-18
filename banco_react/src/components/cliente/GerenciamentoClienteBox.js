import React, { Component } from 'react';
import FormBuscaCliente from './FormBuscaCliente';
import ListaCliente from './ListaCliente';
import FormEditaCliente from './FormEditaCliente';

export default class GerenciamentoClienteBox extends Component{

    constructor(){
        super();
        this.state = {
            renderizaFormEditaCliente: !false,
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


}
