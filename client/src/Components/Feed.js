import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './Feed/NewsFeed';
import ChatBar from './Chat/ChatBar'
import Profile from './Profile/Profile'
class Feed extends Component {

    render () {
        var username = localStorage.getItem("token");
        return (
            <div>
                <div className = "row"></div>
                <div className ="row">
                    <div className = "col s3">
                        <Profile username = {username}/>
                    </div>
                    <div className ="col s6">
                        <NewsFeed username = {username}/>
                    </div>
                    <div className ="col s3">
                        <ChatBar/> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed