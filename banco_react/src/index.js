import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ClienteBox from './components/cliente/ClienteBox';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from './components/home';
import FormCadastroCliente from './components/cliente/FormCadastroCliente';


ReactDOM.render(
        <Router>
            <App>
                <Switch>            
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/cliente" component={ClienteBox}/>
                    <Route exact path="/cliente/novo" component={FormCadastroCliente}/>
                    {/*<Route path="/livro" component={LivroAdmin}/>*/}               
                </Switch>            
            </App>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();
