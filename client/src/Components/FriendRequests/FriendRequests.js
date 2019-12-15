import React, { Component } from 'react';
import friendReq_middleware from '../../Middleware/FriendReq';
import FriendRequest from './FriendRequest';

class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: []
        }
        this.removeAcceptedFriendRequest = this.removeAcceptedFriendRequest.bind(this);
    }
    

    async componentDidMount() {
        var obj = {username: this.props.username};
        var friendRequests = await friendReq_middleware.getAllFriendRequests(obj);
        console.log(friendRequests);
        this.setState({friendRequests: friendRequests})
    }

    removeAcceptedFriendRequest(username) {
        console.log(username);
        var newFriendRequests = this.state.friendRequests.filter((friendRequest) => friendRequest !== username);
        this.setState({friendRequests: newFriendRequests})
    }

    renderContent() {
        return this.state.friendRequests.map((friendRequest) => {
            var recipient = friendRequest;
            var key = this.props.username + recipient;
            return <FriendRequest sender = {this.props.username} recipient = {recipient} key = {key}
            removeAcceptedFriendRequest = {this.removeAcceptedFriendRequest}/>
        })
    }

    render () {
        return (
            <div style = {{marginTop: '100px', backgroundColor: "lightBlue", 
            paddingTop: "2px", paddingBottom: "2px",
            paddingLeft: "2px", paddingRight: "2px"}}>
                <h4>Friend Requests! </h4>
            {this.renderContent()}
            </div>
        )
    }
}

export default FriendRequests;