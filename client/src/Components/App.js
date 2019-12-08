import React, { Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'
import Header from './Header/Header'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Feed from './Feed'
<<<<<<< HEAD
import NewsFeed from './Feed/NewsFeed';
=======
import ChatArea from './Chat/ChatArea'
>>>>>>> af4bd964d30112fa3bc3aa2aebb32248a4ee4e8d
import { ProtectedRoute } from './Auth/ProtectedRoute';

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
                    <ProtectedRoute path ="/profile" component = {NewsFeed}/>
                    <ProtectedRoute path = "/feed" component = {Feed} />
                </div>
                <ChatArea />
            </BrowserRouter>
        </div>
    )
   }
}

export default App;