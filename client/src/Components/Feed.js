import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './Feed/NewsFeed';
import ChatBar from './Chat/ChatBar'
class Feed extends Component {
    render () {
        return (
            <div>
                <div className = "row"></div>
                <div className ="row">
                    <div className ="col s9">
                        <NewsFeed/>
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