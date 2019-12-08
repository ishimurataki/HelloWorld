import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Chat extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("We clicked chat");
        this.props.addChat(this.props.username, this.props.chatRecipient);
    }
    render () {
        var {chatRecipient, key } = this.props;
        return (
            <div>
                    <div key = {key} onClick= {this.handleSubmit}> 
                    {chatRecipient}
                    </div>
            </div>
        )
    }
}


export default connect(null, actions) (Chat);