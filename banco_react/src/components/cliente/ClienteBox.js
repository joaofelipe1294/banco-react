import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import ListaCliente from './ListaCliente';
import FormCadastroCliente from './FormCadastroCliente';
import FormEditaCliente from './FormEditaCliente';


export default class ClienteBox extends Component{
    constructor(){
        super();
        this.state = {
            mensagemDeErro: null, 
            formCadastroClienteRenderizado: !true,
            formEditaClienteRenderizado: !false,
        };
    }

    componentDidMount(){
        PubSub.subscribe('mensagem-erro-cadastro-cliente', function(channel, error){
            this.setState({mensagemDeErro: error});
        }.bind(this));
        PubSub.subscribe('troca-painel-edicao-por-cadastro', function(channel, objetoJson){
            this.setState({
                formCadastroClienteRenderizado: objetoJson.formCadastroClienteRenderizado,
                formEditaClienteRenderizado: objetoJson.formEditaClienteRenderizado,
            });
        }.bind(this));
        PubSub.subscribe('prepara-edicao-de-cliente', function(channel, {}){
            this.setState({
                formCadastroClienteRenderizado: !false,
                formEditaClienteRenderizado: !true,
            })
        }.bind(this));
    }
    
    render(){
        var error_element = '';
        if(this.state.mensagemDeErro === null){
            error_element = '';
        }else{
            error_element = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.mensagemDeErro}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>);
        }

        return(
            <div>
                {error_element}
                <FormCadastroCliente renderizado = {this.state.formCadastroClienteRenderizado}/>
                <FormEditaCliente renderizado = {this.state.formEditaClienteRenderizado}/>
                <ListaCliente/>
            </div>
        );
    }
}