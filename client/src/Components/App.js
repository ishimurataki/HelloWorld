import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
class App extends Component {
    render () {
        return (
            <div> 
                <BrowserRouter > 
                    <Header /> 
                    <div className = "container"> 
                        <Route exact path = "/" component = {Home} />
                        <Route path = "/login" component = {Login} />
                        <Route path = "/signup" component = {Signup} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;