import React, { Component } from 'react';
import friendRec_middleware from '../../Middleware/FriendRec';
import { connect } from 'react-redux'; 
import * as actions from '../../actions';
class FriendRecommendation extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("We clicked accept ");
        // formatted from ,to
        var obj = {
            sender: this.props.sender,
            username: this.props.recipient
        }
        friendRec_middleware.makeNewFriendRequest(obj);
    }
    render () {
        var {recipient, key } = this.props;
        return (
            <div>
                <div key = {key} onClick= {this.handleSubmit}> 
                {recipient}
                </div>
            </div>
        )
    }
}


export default connect(null, actions) (FriendRecommendation);