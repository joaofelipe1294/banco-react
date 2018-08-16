import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import ListaCliente from './ListaCliente';
import FormCadastroCliente from './FormCadastroCliente';


export default class ClienteBox extends Component{
    constructor(){
        super();
        this.state = {mensagemDeErro: null};
    }

    componentDidMount(){
        PubSub.subscribe('mensagem-erro-cadastro-cliente', function(channel, error){
            this.setState({mensagemDeErro: error});
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
                <FormCadastroCliente/>
                <ListaCliente/>
            </div>
        );
    }
}