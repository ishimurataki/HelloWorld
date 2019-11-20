import React, { Component } from 'react' 
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
const renderField = (props) => {
    const { input, label, meta} = props;
    const { error, touched } = meta
    return (
    <div>
        <label>{label}</label>
        <div> 
            <input {...input} />
            <div className = "red-text" style = {{ marginBottom : '20px'}}>
                {touched && error}
            </div>
        </div>
    </div> );

}
class LoginForm extends Component {
    render () {
        return (
            <div>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field key = "usernamez" name = "username" label = "username" type = "text" component = {renderField}/>
                    <Field key = "password" name = "password" label = "password" type = "text" component = {renderField}/>
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

function validate(values) {
    const errors = {};
    if(!values['username']) {
        errors['username']= "You need a username"
    }
    if(!values['password']) {
        errors['password'] = "You need a password"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'loginForm'
})(LoginForm);