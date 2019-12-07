import Dropdown from 'react-dropdown'
import React, { Component } from 'react'
import 'react-dropdown/style.css'
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
            newValue: ''
        }
    }
    onSelect = (event) => {
        this.setState({changeAttribute: event.value});
    }
    handleSubmit = (event) => {
        console.log("Submitted profile update");
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