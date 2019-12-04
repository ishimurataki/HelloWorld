import React, { Component } from 'react'
import chatbar_middleware from '../../Middleware/ChatBar';
class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    // we need to test this cheese
    async componentDidMount() {
        //var result = await chatbar_middleware.fetchAllOnlineFriends();
        var result = [
          "matt", "vinke"
        ]
        this.setState({data: result});
    }

    renderOnlineFriends = (data) => {
        if(!data) {
            return <div> No Active Friends Online </div>
        } else {
            return data.map((postData) => {
                return <div> {postData} </div>
            })
        }
    }
    render () {
        var { data } = this.state;
        return (
            <div>
                {this.renderOnlineFriends(data)}
            </div>
        )
    }
}

export default ChatBar;