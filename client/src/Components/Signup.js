import React, { Component } from 'react'
import { Link } from 'react-router-dom'; 
import auth from './Auth/Auth'; 

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errorUser: '',
            password: '',
            errorPass: '',
            email: '',
            errorEmail: ''
        }
    }
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    validSignupAttempt = () => {
        if(!this.state.errorPass && !this.state.errorUser && !this.state.errorEmail) {
            console.log("triggered signup sequence");
            var obj = {username: this.state.username, password: this.state.password, email: this.state.email};
            auth.signup(obj, (result) => {
                if(result === "success") {
                    this.props.history.push("/feed");
                } else {
                    this.setState({errorUser: result});
                }
            })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        var errorUser = '';
        var errorPass = '';
        var errorEmail = '';
        if(!this.state.username) {
          errorUser = "blank email error";
        }
        if(!this.state.email) {
           errorEmail = 'blank email error';
        }
        if(!this.state.password) {
           errorPass = "blank password error"
        }
        this.setState({errorUser: errorUser, errorPass: errorPass, errorEmail: errorEmail}, () => {
            this.validSignupAttempt();
        });
        
    }
    // to do incorporate interests into the state/etc
    render () {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div><label> Username </label><input value = {this.state.username} onChange = {this.handleUsernameChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorUser}</div> </div>
                    <div><label> Password </label><input label = "password" type = "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorPass}</div>
                    </div>
                    <div><label> Email </label><input value = {this.state.email} onChange = {this.handleEmailChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorEmail}</div>
                    </div> 
                    <div className = "row"><input id = "name" type = "text" length = "10" /><label>Enter Interests</label></div>          
                    <Link to= "/" className = "blue btn-flat left white-text">
                            cancel
                    </Link>
                    <button type = "submit" className = "blue btn-flat right white-text"> 
                        Submit 
                        <i className="material-icons right"> done </i>
                    </button>
                </form>
            </div> 
        )
    }
}

export default Signup;