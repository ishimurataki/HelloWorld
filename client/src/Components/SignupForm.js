import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

const renderField = (props) => {
    const { input, label, meta } = props;
    const { touched, error} = meta;
    return (
        <div>
             <label>{label}</label>
            <div> 
                <input {...input} />
                <div className = "red-text" style = {{ marginBottom : '20px'}}>
                    {touched && error}
                </div>
            </div>
        </div>
    )
}
class SignupForm extends Component {
    render () {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit = {handleSubmit}>
                    <Field name = "username" label = "username" component = {renderField}/>
                    <Field name = "password" label = "password" component = {renderField}/>
                    <Field name = "email" label = "email" component = {renderField}/>
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
    if(!values['email']) {
        errors['email'] = "You need a email"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'signupForm'
})(SignupForm);