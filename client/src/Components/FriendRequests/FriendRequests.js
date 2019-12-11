import React, { Component } from 'react';
import friend_middleware from '../../Middleware/Friends';
import FriendRequest from './FriendRequest';

class FriendRequests extends Component {
    state = {
        friendRequests: []
    }

    async componentDidMount() {
        var obj = {username: this.props.username};
        var friendRequests = await friend_middleware.getAllFriendRequests(obj);
        this.setState({friendRequests: friendRequests})
    }

    renderFriendRequests() {
        return this.state.friendRequests.map((friendRequest) => {
            return <FriendRequest friendRequest = {friendRequest}/>
        })
    }

    render () {
        return (
            <div style = {{marginTop: '100px'}}>
            {this.renderFriendRequests()}
            </div>
        )
    }
}

export default FriendRequests