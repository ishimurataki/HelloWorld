import React, { Component } from 'react'
import post_middleware from './../../Middleware/Post';
import TestButton from './TestButton';
import Post from './Post';
import CreatePost from './CreatePost'
import Auth from '../../Middleware/Auth';

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.pushToNewsFeed.bind(this);
    }
    async componentDidMount() {
        var obj = {username: Auth.getUsername()};
        var response = await post_middleware.fetchPostData(obj);
        this.setState({data: response});
    }

    renderNewsFeed = (data) => {
        console.log(data);
        if(!data) {
            return <div> No Posts </div>
        } else {
            return data.map((postData) => {
                var uniquePostId = postData.date;
                return <Post key={uniquePostId} data= {postData}/>
            })
        }
    }

    pushToNewsFeed = (response) => {
        console.log(response);
        this.setState(prevState => ({
            data: [response, ...prevState.data]
        }));
    }

    render () {
        const { data } = this.state;
        return (
            <div>
                <TestButton/>
                <CreatePost pushToNewsFeed={this.pushToNewsFeed}/>
                <div>
                    {this.renderNewsFeed(data)}
                </div>
            </div>
        )
    }
}

export default NewsFeed