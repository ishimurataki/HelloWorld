import React, { Component } from 'react';
import friendRec_middleware from '../../Middleware/FriendRec';
import { connect } from 'react-redux'; 
import * as actions from '../../actions';
class FriendRecommendation extends Component {
    state = {
        errorMessage: ''
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("We clicked accept ");
        // formatted from ,to
        var date = new Date().toUTCString();
        var obj = {
            sender: this.props.sender,
            username: this.props.recipient,
            date: date
        }
        var response = await friendRec_middleware.makeNewFriendRequest(obj);
        console.log(response);
        if(response === "ALREADY SENT") {
            this.setState({errorMessage: "friend request as already been sent by either you or the other person"});
        }
    }
    render () {
        var {recipient, key } = this.props;
        return (
            <div>
                <div key = {key} onClick= {this.handleSubmit}> 
                {recipient}
                <div className = "red-text" > {this.state.errorMessage} </div>
                </div>
            </div>
        )
    }
}


export default connect(null, actions) (FriendRecommendation);