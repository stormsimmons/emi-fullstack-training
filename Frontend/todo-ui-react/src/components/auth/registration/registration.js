import React, { Component } from 'react';
import './registration.css';
import { AuthService } from '../../../services/auth-service'

class Registration extends Component {

    authService = new AuthService()

    constructor() {
        super();
        this.state = {
            form: {
                firstName: {name :"First Name", value: ""},
                lastName: {name :"Last Name", value: ""},
                userName: {name :"Username", value: ""},
                password:{name :"Password", value: ""}
            }
        }
    }

    registerClick = () => {
        this.props.registrationClick(false)
    }

    onSubmit = () => {
        let username = this.state.form.userName.value
        let password = this.state.form.password.value

        this.authService.register({
            firstName: this.state.form.firstName.value,
            lastName: this.state.form.lastName.value,
            userName: this.state.form.userName.value,
            password:this.state.form.password.value
        }).then(x => {
            this.login(username,password)
        })
    }

    onChange = (key, e) => {
        this.state.form[key].value = e.target.value
        this.setState(this.state)
    }
    
    login = (username, password) => {
        this.authService.signin(username, password).then(x => {
            if(x.data.accessToken){
                localStorage.setItem("accessToken", x.data.accessToken)
                window.location.href = '/'
            }
        })
    }
    render() {
       let formFields = []
        Object.keys(this.state.form).forEach(key => {
            formFields.push(
            <div key={this.state.form[key].name} className="registration-control-group">
                <input type="text" className="registration-field" value={this.state.form[key].value} onChange={(e) => this.onChange(key ,e)} placeholder={this.state.form[key].name} />
            </div>
            )
        })
 
        return (
            <div className="registration">
                <div className="registration-screen">
                    <div className="app-title">
                        <h1>Registration</h1>
                    </div>
                    <div className="registration-form">
                        {formFields}
                        <div className="registration-control-group">
                            <button className="btn btn-primary btn-large btn-block" onClick={this.onSubmit}>Register</button>
                            <button className="btn btn-primary btn-large btn-block register" onClick={this.registerClick}>Back To Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
