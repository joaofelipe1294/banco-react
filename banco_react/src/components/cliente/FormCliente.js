import React, { Component } from 'react';
import FormGroupGenerico from "../genericos/FormGroupGenerico";
import Cliente from '../../models/Cliente';

export class FormCliente extends Component{
    constructor (){
        super();
        this.state = {nome: '', sobrenome: '', rg: '', cpf: '', salario: ''};
        this.enviaFormCadastro = this.enviaFormCadastro.bind(this);
        this.setValue = this.setValue.bind(this)
    }

    render(){
        return (
            <div className = "col-md-9 mt-4 mx-auto">
                <div className="card">
                    <div className="card-header text-center bg-primary">
                        <h1 className = "text-white">Cadastro de cliente</h1>
                    </div>
                    <div className="card-body">
                        <form type = "POST" onSubmit = {this.enviaFormCadastro}>
                            <div className = "row">
                                <div className = "col-md-6">
                                    <FormGroupGenerico label = "Nome" name = "nome" id = "nome" value = {this.state.nome}  onChange = {this.setValue.bind(this, 'nome')}/>
                                    <FormGroupGenerico label = "RG" id = "rg" type = "number" value = {this.state.rg} onChange = {this.setValue.bind(this, 'rg')}/>
                                    <FormGroupGenerico label = "Salário" id = "salario" type = "number" step = "0.01" value = {this.state.salario} onChange = {this.setValue.bind(this, 'salario')}/>
                                </div>
                                <div className = "col-md-6">
                                    <FormGroupGenerico label = "Sobrenome" id = "sobrenome" value = {this.state.sobrenome} onChange = {this.setValue.bind(this, 'sobrenome')}/>
                                    <FormGroupGenerico label = "CPF" id = "cpf" type = "number" value = {this.state.cpf} onChange = {this.setValue.bind(this, 'cpf')}/>
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

    setValue(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);           
    }

    enviaFormCadastro (evento){
        evento.preventDefault();
        let cliente = new Cliente();
        cliente.nome = this.state.nome;
        cliente.sobrenome = this.state.sobrenome;
        cliente.rg = this.state.rg;
        cliente.cpf = this.state.cpf;
        cliente.salario = this.state.salario;
        console.log(cliente);
        
    }

}