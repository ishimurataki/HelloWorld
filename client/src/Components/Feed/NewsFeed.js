import React, { Component } from 'react'
import post_middleware from './../../Middleware/Post';
import TestButton from './TestButton';
import Post from './Post';
import CreatePost from './CreatePost'

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []};
    }
    async componentDidMount() {
        var response = await post_middleware.fetchPostData();
        this.setState({data: response.data});
    }
    renderNewsFeed() {
        if(!this.state.data) {
            return <div> Loading </div>
        } else {
            return this.state.data.map((postData) => {
                console.log(postData);
                var uniquePostId = postData.id;
                return <Post key={uniquePostId} data= {postData}/>
            })
        }
    }
    render () {
        return (
            <div>
                <TestButton/>
                <CreatePost />
                <div>
                    {this.renderNewsFeed()}
                </div>
            </div>
        )
    }
}

export default NewsFeed