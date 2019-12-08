import Dropdown from 'react-dropdown';
import React, { Component } from 'react';
import 'react-dropdown/style.css';
import profile_middleware from './../../Middleware/Profile';
const options = [
    {value: 'email', label: 'Email'},
    {value: 'birthday', label: 'Birthday'},
    {value: 'interests', label: 'Interests'},
    {value: 'status', label: 'Status'}
];
const defaultOption = options[0];

class UpdateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeAttribute: '',
            value: ''
        }
    }
    onSelect = (event) => {
        this.setState({changeAttribute: event.value});
    }

    handleValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted profile update");
        var obj = {
            username: this.props.username,
            field: this.state.changeAttribute,
            value: this.state.value
        }
        profile_middleware.updateProfile(obj, function(response) {
            console.log("Successful Update");
            this.props.updateProfile(response);
        });
    }
    render () {
        return (
            <div>
                <Dropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select an option" />
                <form onSubmit = {this.handleSubmit}>
                        <div><label> Update Value {this.state.changeAttribute} </label><input value = {this.state.newValue} onChange = {this.handleValueChange}/></div>
                        <button type = "submit" className = "blue btn-flat right white-text"> 
                            Update
                            <i className="material-icons right"> done </i>
                        </button>
                </form>
            </div>
        )
    }
}

export default UpdateProfile;