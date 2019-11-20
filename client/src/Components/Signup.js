import React, { Component } from 'react'
import SignupForm from './SignupForm'

class Signup extends Component {
    // connect this to redux
    handleSubmit = (values) => {
        console.log(values)
    }
    render () {
        return (
            <div>
                <SignupForm onSubmit = {this.handleSubmit} />
            </div>
        )
    }
}

export default Signup;