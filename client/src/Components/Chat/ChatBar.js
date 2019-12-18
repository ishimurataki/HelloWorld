import React, { Component } from 'react'
import chatbar_middleware from '../../Middleware/ChatBar';
import Chat from './Chat';
import './ChatBar.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chatrooms: [],
            show: false
        }
        this.handleGetChats = this.handleGetChats.bind(this);
        this.renderChatrooms = this.renderChatrooms.bind(this);
    }
    // IMPORTANT: TEST ALL ONLINE FRIENDS
    async componentDidMount() {
        var obj = { username: localStorage.getItem("token") };
        var result = await chatbar_middleware.fetchAllOnlineFriends(obj);
        console.log(result);
        this.setState({ data: result });

        setInterval(async () => {
            const c = await chatbar_middleware.getChatrooms();
            const friendos = await chatbar_middleware.fetchAllOnlineFriends({ username: localStorage.getItem("token") });
            this.setState({chatrooms: c, data:friendos});
        }, 5000)
    }

    renderOnlineFriends = (data) => {
        if (!data) {
            return <div> No Active Friends Online </div>
        } else {
            return data.map((postData) => {
                return <Chat key={postData} chatRecipient={postData} username={this.props.username} />
            })
        }
    }

    handleChange = (event) => {
        this.refs.errorArea.textContent = '';
        if (event.which === 13 && this.refs.textarea.value) {
            let friends = this.refs.textarea.value.split(',').map(friend => friend.trim());
            if (friends.every((friend) => {
                if (!this.props.friends.includes(friend)) {
                    this.refs.errorArea.textContent = friend + ' is not your friend'
                    return false;
                }
                return true;
            })) {
                friends.push(this.props.username);
                this.props.addChat(this.props.username, friends);
                this.refs.textarea.value = '';
            }
        }
    }

    handleGetChats = async () => {
        const c = await chatbar_middleware.getChatrooms();
        this.setState({chatrooms: c, show: !this.state.show});
        console.log(this.state.show);
        console.log(c);
    }

    renderChatrooms = () => {
        console.log(this.state.chatrooms);
    }


    render() {
        const { data, chatrooms } = this.state;
        const { addChat, username } = this.props;
        return (
            <div>
                <h5> Chat Active Friends </h5>
                {this.renderOnlineFriends(data)}
                <div id='chatsearch'>🔍: 
                    <span><input id='friendFind' ref='textarea' type="text" name="username" onKeyPress={this.handleChange} autoComplete='off'></input></span>
                    <span id='groupChat' onClick={this.handleGetChats}>💬</span>
                </div>
                <span id='errorArea' ref="errorArea"></span>
                {
                    this.state.show && <ul>
                        {
                            chatrooms.map(chat => <li onClick={async () => {
                                const ppl = chat.chatroomID.split(',').map(a => a.trim()).filter(a => a !== '');
                                addChat(username, ppl);
                                await chatbar_middleware.viewChatroom({chatroomID: chat.chatroomID});
                            }} style={ chat.new !== 'true' ? { fontWeight: 'normal' } : { fontWeight: 'bold' } } >{chat.chatroomID}</li>)
                        }
                    </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ friends }) => ({ friends });

export default connect(mapStateToProps, actions)(ChatBar);