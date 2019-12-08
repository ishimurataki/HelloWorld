import React, { Component } from 'react';
import post_middleware from './../../Middleware/Post';
import Post from './Post';
import CreatePost from './CreatePost';
import { withRouter } from 'react-router-dom';


class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.pushToNewsFeed.bind(this);
    }
    async componentDidMount() {
        var username = this.props.username;
        if(this.props.location) {
            username = this.props.location.state.username
        }
        var obj = {username: username};
        var response = await post_middleware.fetchPostData(obj);
        console.log("Received post data for newsfeed");
        this.setState({data: response});
    }

    renderNewsFeed = (data) => {
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
        console.log(response.data);
        this.setState(prevState => ({
            data: [response.data, ...prevState.data]
        }));
    }

    renderBack = () => {
        if(this.props.location) {
            return <div className = "blue btn-flat left white-text" onClick = {() => {
                this.props.history.goBack()
            }}></div>
        }
    }

    render () {
        const { data } = this.state;
        return (
            <div>
                <CreatePost pushToNewsFeed={this.pushToNewsFeed} username = {this.props.username ? this.props.username : localStorage.getItem("token")} 
                recipient = {this.props.location ? this.props.location.state.username : 'none'}/>
                <div style = {{marginTop: '70px'}}>
                    {this.renderNewsFeed(data)}
                </div>
                {this.renderBack()}
            </div>
        )
    }
}

export default NewsFeed;