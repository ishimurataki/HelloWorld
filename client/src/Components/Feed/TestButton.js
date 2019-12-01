import React, { Component } from 'react'
import Test from './../../Middleware/Test'

class TestButton extends Component {
    handleSubmit(e) {
        e.preventDefault();
        Test.testPostCall();
    }
    render() {
        return (
            <div>
                <form onSubmit = {e => this.handleSubmit(e)}>
                    <button type = "submit" className = "orange btn-flat right white-text"> 
                    Test API
                    <i className="material-icons right"> done </i>
                    </button>
                </form>
            </div>
       
        )
    }
}

export default TestButton