import React, { Component } from 'react';

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
                      <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input className="form-control" id="nome"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="RG">RG</label>
                        <input className="form-control" id="rg"/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="salario">Salário</label>
                      <input className="form-control" id="salario" type="number" step="0.01"/>
                    </div>
                    </div>
                    <div className = "col-md-6">
                      <div className="form-group">
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <input className="form-control" id="sobrenome"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input className="form-control" id="nome"/>
                      </div>
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