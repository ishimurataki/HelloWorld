import React, { Component } from 'react'
import './Chatbox.css'
import io from 'socket.io-client';

class Chatbox extends Component {

    constructor(props) {
        super(props);
        const socket = io.connect('http://localhost:1024');

        this.messagesArea = React.createRef();

        this.state = {
            chatHistory: [],
            socket
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let socket = this.state.socket;

        socket.on('message', (msg) => {
            let chatHistory = this.state.chatHistory;
            chatHistory.push(msg);
            this.setState({ chatHistory });

            let element = this.messagesArea.current;
            if (element) element.scrollTop = element.scrollHeight;
        })

        socket.emit('join', this.props.chatroomName, (err, chatHistory) => {
            if (err) {
                return console.log(err)
            }
            this.setState({ chatHistory });
        })
    }

    handleChange(event) {
        let msg = this.refs.textarea.value
        if (event.which === 13 && msg) {
            event.preventDefault();
            this.state.socket.emit('message', this.props.chatroomName, msg, (err, chatHistory) => {
                if (err) console.log('error in emitting message')
            })
            this.refs.textarea.value = ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const chat = this.state.chatHistory.map((c) => <li>{c.msg}</li>);
        return (
            <div id='outer-div'>
                <div className="chatbox-container">
                    <div id='header-container'>
                        <a href="https://www.w3schools.com" id='chatname'>{this.props.username}</a>
                        <button type="button" id="cancelbtn" onClick={() => this.props.onClose(this.props.chatroomName)}>&times;</button>
                    </div>
                    <hr />
                    <div id='messages-container' ref={this.messagesArea}>
                        <ul id="messages">{chat}</ul>
                    </div>
                    <hr />
                    <input ref='textarea' placeholder="Type message.." name="msg" onKeyPress={this.handleChange} autocomplete="off" required ></input>
                </div>
            </div>
        )
    }
}

export default Chatbox;