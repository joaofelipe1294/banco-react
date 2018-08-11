import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="layout">
            <a href="#menu" id="menuLink" class="menu-link">
                <span></span>
            </a>
            <div id="menu">
                <div class="pure-menu">
                    <a class="pure-menu-heading" href="#">Company</a>
                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">About</a></li>
                        <li class="pure-menu-item menu-item-divided pure-menu-selected">
                            <a href="#" class="pure-menu-link">Services</a>
                        </li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div id="main">
              <div class="header">
                <h1>Page Title</h1>
                <h2>A subtitle for your page goes here</h2>
              </div>
              <div class="content">
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
