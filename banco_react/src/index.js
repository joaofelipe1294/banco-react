import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ClienteBox from './components/cliente/ClienteBox';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Home from './components/home';
import FormCadastroCliente from './components/cliente/FormCadastroCliente';
import FormBuscaCliente from './components/cliente/FormBuscaCliente';


ReactDOM.render(
        <Router>
            <App>
                <Switch>            
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/cliente" component={ClienteBox}/>
                    <Route exact path="/cliente/novo" component={FormCadastroCliente}/>
                    <Route exact path="/clientes" component={FormBuscaCliente}/>              
                </Switch>            
            </App>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();
