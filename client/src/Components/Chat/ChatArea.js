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
    }
    renderChats() {
        const path = this.props.location.pathname;
        if(path === "/feed") {
            const chat = this.props.liveChats.map((c) => <Chatbox show='true' chatroomName={c.name} sender={c.user1}/>)
            return (
                <div style={divStyle}>
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