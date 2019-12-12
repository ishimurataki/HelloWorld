import React, { Component } from 'react';
import friendReq_middleware from './../../Middleware/FriendReq';
import { connect } from 'react-redux'; 
import * as actions from './../../actions';
class FriendRequest extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("We clicked on a friend request");
        // formatted from ,to
        var obj = {
            sender: this.props.sender,
            recipient: this.props.recipient
        }
        friendReq_middleware.makeNewFriendRequest(obj);
    }
    render () {
        var {sender, recipient, key } = this.props;
        return (
            <div>
                <div key = {key} onClick= {this.handleSubmit}> 
                {recipient}
                </div>
            </div>
        )
    }
}


export default connect(null, actions) (FriendRequest);