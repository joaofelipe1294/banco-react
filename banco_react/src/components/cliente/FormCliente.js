import React, { Component } from 'react';
import FormGroupGenerico from "../genericos/FormGroupGenerico";

export class FormCliente extends Component{
    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto">
                <div className="card">
                    <div className="card-header text-center bg-primary">
                        <h1 className = "text-white">Cadastro de cliente</h1>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className = "row">
                                <div className = "col-md-6">
                                    <FormGroupGenerico name = "Nome" id = "nome"/>
                                    <FormGroupGenerico name = "RG" id = "rg" type = "number"/>
                                    <FormGroupGenerico name = "Salário" id = "salario" type = "number" step = "0.01"/>
                                </div>
                                <div className = "col-md-6">
                                    <FormGroupGenerico name = "Sobrenome" id = "sobrenome"/>
                                    <FormGroupGenerico name = "CPF" id = "cpf" type = "number"/>
                                </div>
                            </div>
                            <div className = "form-group">
                                <button className = "btn btn-primary">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}