import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap'
import ClienteBox from './components/cliente/ClienteBox';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

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
          
          <ClienteBox/>



        { /* ACABA AQUI A DIV MAIN */}
      </div>
    );
  }
}

export default App;
