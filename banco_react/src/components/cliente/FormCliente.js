import React, { Component } from 'react';
import FormGroupGenerico from "../genericos/FormGroupGenerico";
import Cliente from '../../models/Cliente';
import $ from 'jquery';

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
        cliente.salario = parseFloat(this.state.salario.replace(',', '.'));
        console.log(cliente);
        $.ajax({
            url: 'http://10.0.1.32:8080/api_gerenciador_de_contas/webresources/cliente',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(cliente),
            success: function(response){
                this.setState({nome: '', sobrenome: '', rg: '', cpf: '', salario: ''});
            }.bind(this),
            error: function(xhr,status,error){
                console.log('Status: ' + status);
                console.log(xhr);
                console.log(error);
                alert(xhr.responseText);
            }
       });
    }
}

export class ListaCliente extends Component{

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
                            <th>
                                <h3>Nome</h3>
                            </th>
                            <th>
                                <h3>Sobrenome</h3>
                            </th>
                            <th>
                                <h3>RG</h3>
                            </th>
                            <th>
                                <h3>CPF</h3>
                            </th>
                            <th>
                                <h3>Salário</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaClientes.map(function(cliente) {
                            return(
                                <tr key = {cliente.clienteId}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.sobrenome}</td>
                                    <td>{cliente.rg}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.salario}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );    
        
    }

    componentDidMount(){
        $.ajax({
            url: 'http://10.0.1.32:8080/api_gerenciador_de_contas/webresources/cliente',
            type: 'GET',
            dataType: 'json',
            success: function(listaAtualizada){
                this.setState({listaClientes: listaAtualizada});         
            }.bind(this),
            error: function(xhr,status,error){
                console.log('Status: ' + status);
                console.log(xhr);
                console.log(error);
                alert('Não foi possível listar os clientes listados.');
            }
       });
    }

}

export default class ClienteBox extends Component{
    constructor(){
        super();
        this.state = {error_message: null}
    }
    
    render(){
        var error_element = '';
        if(this.state.error_message === 'null'){
            error_element = '';
        }else{
            error_element = (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    AQUI SERAO EXIBIDAS MENSAGENS DE ERRO !!!
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>);
        }

        return(
            <div>
                {error_element}
                <FormCliente/>
                <ListaCliente/>
            </div>
        );

    }


}