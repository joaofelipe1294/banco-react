import React, { Component } from 'react';
import FormBuscaCliente from './FormBuscaCliente';
import ListaCliente from './ListaCliente';

export default class GerenciamentoClienteBox extends Component{

    render(){
        return (
            <div>
                <FormBuscaCliente/>
                <ListaCliente/>
            </div>
        );
    }


}
