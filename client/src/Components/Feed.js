import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './Feed/NewsFeed';
import ChatBar from './Chat/ChatBar'
import Profile from './Profile/Profile'
import FriendRequests from './FriendRequests/FriendRequests';
import TestButton from './Feed/TestButton'
import { connect } from 'react-redux';
import * as actions from '../actions';


class Feed extends Component {
    state = {
        user: ''
    }
    componentDidMount() {
        this.props.fetchUser();
    }
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            console.log(this.props.user);
            this.setState({          
                user: this.props.user
            });
        }
    }
    render () {
        var username = this.state.user;
        if(!username) {
            username = localStorage.getItem("token");
        }
        if(username) {
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
        } else {
            return <div> Loading </div>
        }
    }
}
function mapStateToProps(state) {
    return { user: state.auth};
}
export default connect(mapStateToProps, actions)(Feed);