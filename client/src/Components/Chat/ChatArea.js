import React, { Component } from 'react'
import Chatbox from './Chatbox'
import { withRouter } from 'react-router-dom';


const divStyle = {
    position: 'fixed',
    bottom: '0',
    padding: '30px',
    width: '100%'
}

class ChatArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openChats: new Set()
        }
        this.addChatbox = this.addChatbox.bind(this)
        this.removeChatbox = this.removeChatbox.bind(this)
    }

    addChatbox(chatboxName) {
        var openChats = this.state.openChats.add(chatboxName);
        this.setState({ openChats })
    }

    removeChatbox(chatboxName) {
        var openChats = this.state.openChats;
        openChats.delete(chatboxName);
        this.setState({ openChats })
    }
    renderChats() {
        const path = this.props.location.pathname;
        if(path === "/feed") {
            const chat = [...this.state.openChats].map((c) => <Chatbox show='true' onClose={this.removeChatbox} chatroomName={c}/>);
            console.log(this.state.openChats)
    
            return (
                <div style={divStyle}>
                    <button type="button" onClick={() => this.addChatbox('TestRoom')}>Add Chatroom 1!</button>
                    <button type="button" onClick={() => this.addChatbox('TestRoom2')}>Add Chatroom 2!</button>
                    <div id='inner-div'>
                        {chat}
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderChats()}
            </div>
        )
    }
}
 
export default withRouter(ChatArea);