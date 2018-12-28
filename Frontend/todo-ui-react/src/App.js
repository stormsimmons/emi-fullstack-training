import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { PrivateRoute } from './router'
import './App.css';
import Home from './components/home/home';
import { AuthHelper } from './helpers/auth-helper';
import Auth from './components/auth/auth';


class App extends Component {

  authHelper  = new AuthHelper();
  constructor(){
    super();
    this.state = {authenticated: this.authHelper.authenticate()}
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/login" component={Auth} />
          <PrivateRoute authenticated={this.state.authenticated} path='/' component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
