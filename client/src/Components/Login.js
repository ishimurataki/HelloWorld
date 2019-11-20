import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
    render () {
        return (
            <div>
                <form>
                    <label> Username </label>
                    <input /> 
                    <label> Password </label> 
                    <input />
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

export default Login;