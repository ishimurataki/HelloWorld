import React, { Component } from 'react'
import Chatbox from './Chatbox'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

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
            openChats: new Set(),
            openChatCount: 0
        }
        this.addChatbox = this.addChatbox.bind(this)
        this.removeChatbox = this.removeChatbox.bind(this)
    }

    addChatbox(chat) {
        console.log("CHAT PARAMTER FOR ADD CHATBOX");
        console.log(chat);
        var chatboxName = chat.name;
        var openChats = this.state.openChats.add(chatboxName);
        var newCount = this.state.openChatCount + 1;
        this.setState({ openChats, openChatCount: newCount });
        console.log(this.state);
    }

    removeChatbox(chatboxName) {
        var openChats = this.state.openChats;
        var newCount = this.state.openChatCount - 1;
        openChats.delete(chatboxName);
        this.setState({ openChats, openChatCount: newCount });
    }
    // renders the chat buttons like "chat with Matt kim, etc"
    renderButtons() {
        console.log(this.props.liveChats);
        var liveChats = this.props.liveChats;
        if(this.state.openChatCount === 0) {
            return liveChats.map((chat) => {
                // other users
                var user2 = chat.user2;
                return <button type="button" onClick={() => this.addChatbox(chat)}>New Chat with {user2}!</button>
            });
        }
    }
    renderChats() {
        const path = this.props.location.pathname;
        if(path === "/feed") {
            const chat = [...this.state.openChats].map((c) => <Chatbox show='true' onClose={this.removeChatbox} chatroomName={c}/>);
            return (
                <div style={divStyle}>
                    {this.renderButtons()}
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
const mapStateToProps = state => {
    return { liveChats: state.chat};
}
export default connect(mapStateToProps)(withRouter(ChatArea));