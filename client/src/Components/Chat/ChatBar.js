import React, { Component } from 'react'
import chatbar_middleware from '../../Middleware/ChatBar';
import Chat from './Chat';
class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    // IMPORTANT: TEST ALL ONLINE FRIENDS
    async componentDidMount() {
        var obj = {username: localStorage.getItem("token")};
        var result = await chatbar_middleware.fetchAllOnlineFriends(obj);
        console.log(result);
        this.setState({data: result});
    }

    renderOnlineFriends = (data) => {
        if(!data) {
            return <div> No Active Friends Online </div>
        } else {
            return data.map((postData) => {
                return <Chat key = {postData} chatRecipient = {postData} username = {this.props.username}/>
            })
        }
    }
    render () {
        var { data } = this.state;
        return (
            <div>
                <h5> Chat Active Friends </h5>
                {this.renderOnlineFriends(data)}
            </div>
        )
    }
}

export default ChatBar;