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
            data: []
        }
    }
    // IMPORTANT: TEST ALL ONLINE FRIENDS
    async componentDidMount() {
        var obj = { username: localStorage.getItem("token") };
        var result = await chatbar_middleware.fetchAllOnlineFriends(obj);
        console.log(result);
        this.setState({ data: result });
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

    render() {
        var { data } = this.state;
        return (
            <div>
                <h5> Chat Active Friends </h5>
                {this.renderOnlineFriends(data)}
                <div id='chatsearch'>🔍: 
                    <span><input id='friendFind' ref='textarea' type="text" name="username" onKeyPress={this.handleChange} autoComplete='off'></input></span>
                    <span id='groupChat' onClick={() => console.log('Group chat clicked')}>💬</span>
                </div>
                <span id='errorArea' ref="errorArea"></span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { friends: state.friends };
}

export default connect(mapStateToProps, actions)(ChatBar);