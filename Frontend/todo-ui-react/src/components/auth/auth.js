import React, { Component } from 'react';
import './auth.css';
import Login from './login/login';
import Registration from './registration/registration';

class Auth extends Component {

    constructor(){
        super();
        this.state = {isRegistration : false}
    }

    registrationClick = (data)=> {
        this.setState({isRegistration: data})
    }

    render() {
        if(!this.state.isRegistration){
            return (<Login registrationClick={this.registrationClick}/>)
        }else{
            return (<Registration registrationClick={this.registrationClick} /> )
        }
    }
  }
  
  export default Auth;
  