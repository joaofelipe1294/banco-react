import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClienteBox from './components/cliente/ClienteBox';
//import { Router, Route, Link } from 'react-router';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from './components/home';


ReactDOM.render(
        <Router>
            <App>
                <Switch>            
                    <Route exact path="/" component={Home}/>
                    <Route path="/cliente" component={ClienteBox}/>
                    {/*<Route path="/livro" component={LivroAdmin}/>*/}               
                </Switch>            
            </App>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();
