import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './NewsFeed';
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
                        <div className="card-panel blue">
                            <span className="white-text">Chat Bar</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed