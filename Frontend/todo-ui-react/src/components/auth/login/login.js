import React, { Component } from 'react';
import './login.css';
import { AuthService } from '../../../services/auth-service'

class Login extends Component {

    authService = new AuthService()

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }

    }

    login = () => {
        this.authService.signin(this.state.username, this.state.password)
        .then(x => {
            if(x.data.accessToken){
            localStorage.setItem("accessToken", x.data.accessToken)
            window.location.href = '/'
            }
        })
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    registerClick = () => {
        this.props.registrationClick(true)
    }

    

    render() {
        return (
            <div className="login">
                <div className="login-screen">
                    <div className="app-title">
                        <h1>Login</h1>
                    </div>
                    <div className="login-form">
                        <div className="login-control-group">
                            <input type="text" className="login-field" placeholder="Username" value={this.state.username} onChange={this.handleUsername} id="login-name" />
                        </div>

                        <div className="login-control-group">
                            <input type="password" className="login-field" placeholder="Password" value={this.state.password} onChange={this.handlePassword} id="login-pass" />
                        </div>

                        <button className="btn btn-primary btn-large btn-block" onClick={this.login}>Login</button>
                        <button className="btn btn-primary btn-large btn-block register" onClick={this.registerClick}>Register</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
