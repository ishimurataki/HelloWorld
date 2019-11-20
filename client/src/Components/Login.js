import React, { Component } from 'react';
import LoginForm from './LoginForm'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleSubmit = (values) => {
        console.log(values);
    }
    render () {
        return (
            <div> 
                <LoginForm onSubmit = {this.handleSubmit} />
            </div>
        )
    }
    
}

export default Login;