import React, { Component } from 'react';
import FormGroupBuscaGenerico from './../genericos/FormGroupBuscaGenerico';


export default class FormBuscaCliente extends Component{

    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto" hidden = {this.props.renderizado}>
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Buscar cliente</h1>
                    </div>
                    <div className="card-body">
                        <FormGroupBuscaGenerico label= "Busca por Nome." type = "text"/>
                        <FormGroupBuscaGenerico label= "Busca por Sobrenome." type = "text"/>
                        <FormGroupBuscaGenerico label= "Busca por RG." type = "number"/>
                        <FormGroupBuscaGenerico label= "Busca por CPF." type = "number"/>
                    </div>
                </div>
            </div>
        );
    }
}

