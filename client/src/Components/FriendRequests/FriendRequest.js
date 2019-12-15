import React, { Component } from 'react';
import friendReq_middleware from '../../Middleware/FriendReq';
class FriendRequest extends Component {
    handleAccept = async (e) => {
        e.preventDefault();
        console.log("Adding as friend now");
        // formatted from ,to
        var obj = {
            sender: this.props.sender,
            username: this.props.recipient,
            date: new Date().toUTCString()
        }
        const response = await friendReq_middleware.acceptFriendRequest(obj);
        console.log(response);
        if(response === "success") {
            console.log(this.props.recipient);
            this.props.removeAcceptedFriendRequest(this.props.recipient);
        }
    }
    render () {
        var {recipient, key } = this.props;
        return (
            <div>
                <div key = {key} onClick= {this.handleAccept}> 
                {recipient}
                </div>
            </div>
        )
    }
}


export default FriendRequest;