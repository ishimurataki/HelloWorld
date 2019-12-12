import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './Feed/NewsFeed';
import ChatBar from './Chat/ChatBar'
import Profile from './Profile/Profile'
import FriendRequests from './FriendRequests/FriendRequests';
import TestButton from './Feed/TestButton'
class Feed extends Component {

    render () {
        // localStorage.removeItem("token");
        // var username = this.props.location.state.username;
        const username = localStorage.getItem("token");
        return (
            <div>
                <div className = "row"></div>
                <TestButton/>
                <div className ="row">
                    <div className = "col s3">
                        <Profile username = {username}/>
                        <FriendRequests username = {username} />
                    </div>
                    <div className ="col s6">
                        <NewsFeed username = {username}/>
                    </div>
                    <div className ="col s3">
                        <ChatBar username = {username}/> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed