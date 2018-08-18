import React, { Component } from 'react';
import FormGroupPesquisaGenerico from './../genericos/FormGroupPesquisaGenerico';


export default class FormBuscaCliente extends Component{

    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto" hidden = {this.props.renderizado}>
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Buscar cliente</h1>
                    </div>
                    <div className="card-body">
                        <FormGroupPesquisaGenerico label= "Busca por Nome." type = "text"/>
                        <FormGroupPesquisaGenerico label= "Busca por Sobrenome." type = "text"/>
                        <FormGroupPesquisaGenerico label= "Busca por RG." type = "number"/>
                        <FormGroupPesquisaGenerico label= "Busca por CPF." type = "number"/>
                    </div>
                </div>
            </div>

        );
    }



}

