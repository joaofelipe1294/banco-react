import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap'
import ClienteBox from './components/cliente/ClienteBox';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

library.add(fas);


class App extends Component {

  constructor(){
    super();
    this.state = {
      mensagemDeErro: null,
    }
  }

  render() {
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
        </div>
      );
    }
    return (
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={'/'}>Banco-React</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active"></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Cliente
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={'/cliente/novo'}>Novo</Link>
                  <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Cadastrados</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Conta</a>
                </li>
              </ul>
            </div>
          </nav>
          {error_element}
          {this.props.children}
        </div>
    );
  }
}

export default App;
