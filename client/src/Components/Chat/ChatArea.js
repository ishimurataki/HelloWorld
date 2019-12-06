import React, { Component } from 'react'
import Chatbox from './Chatbox'

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

    render() {
        let chat = null
        if (this.state.openChats.size != 0) {
            chat = <Chatbox show='true' onClose={this.removeChatbox} />
        }
        console.log(this.state.openChats)

        return (
            <div style={divStyle}>
                <button type="button" onClick={() => this.addChatbox('TestRoom')}>Add Chatroom!</button>
                {chat}
            </div>
        )
    }
}
 
export default ChatArea;