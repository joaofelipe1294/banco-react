import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Banco-React</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Cliente <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Conta</a>
                </li>
              </ul>
            </div>
          </nav>

          {/* AQUI COMECA CODIGO DO CLIENTE */}
          <div className = "col-md-9 mt-4 mx-auto">
            <div className="card">
              <div className="card-header text-center bg-primary">
                <h1 className = "text-white">Cadastro de cliente</h1>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input className="form-control" id="nome"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input className="form-control" id="sobrenome"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="RG">RG</label>
                    <input className="form-control" id="rg"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input className="form-control" id="nome"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="salario">Salário</label>
                    <input className="form-control" id="salario" type="number" step="0.01"/>
                  </div>
                  <div className = "form-group">
                    <button className = "btn btn-primary">Cadastrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>








      </div>
    );
  }
}

export default App;
