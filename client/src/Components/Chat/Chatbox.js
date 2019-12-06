import React, { Component } from 'react'
import './Chatbox.css'
import io from 'socket.io-client';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        const socket = io.connect('http://localhost:1024');

        socket.emit('join', props.chatroomName, (err, chatHistory) => {
            if (err) {
                return console.log(err)
            }
            console.log(chatHistory)
        })

        socket.on('message', (msg) => {
            let chatHistory = this.state.chatHistory;
            chatHistory.push(msg);
            this.setState({chatHistory});
            
            let element = document.getElementById('messages-container');
            element.scrollTop = element.scrollHeight;
        })

        this.state = {
            show: props.show,
            chatHistory: [],
            socket
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let msg = this.refs.textarea.value
        this.state.socket.emit('message', this.props.chatroomName, msg, (err, chatHistory) => {
            if (err) {
                return console.log('we here')
            }
        })
        this.refs.textarea.value = ''
    }

    render() {
        const chat = this.state.chatHistory.map((c) => <li>{c.msg}</li>);
        return (
            <div id='outer-div'>
            {
                this.state.show &&
                        <form class="form-container" onSubmit={this.handleSubmit}>
                            <div id='messages-container'>
                                <ul id="messages">{chat}</ul> 
                            </div>
                            <textarea ref='textarea' placeholder="Type message.." name="msg" required></textarea>

                            <button type="submit" class="btn">Send</button>
                            <button type="button" class="btn cancel" onClick={() => this.props.onClose(this.props.chatroomName)}>Close</button>
                        </form>
            }
            </div>
        )
    }
}

export default Chatbox;