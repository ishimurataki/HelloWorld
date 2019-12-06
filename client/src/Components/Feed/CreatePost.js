import React, { Component } from 'react'
import './CreatePost.css'
import Post from './../../Middleware/Post'; 
import auth from './../../Middleware/Auth';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCaptionChange = this.handleCaptionChange.bind(this);
    }

    handleCaptionChange(event) {
        this.setState({caption: event.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Creating post");
        var date = new window.Date();
        // format of date will be 12-2-2019-12-02
        // format of date will be month-day-year-hour-minute-second
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();
        var timeOfPost = month + "-" + day + "-" + year + "-" + hour + "-" + minute + "-" + seconds;
        var obj = {
            content: this.state.caption,
            recipient: "none",
            date: timeOfPost,
            creator: this.props.username
        }
        Post.createPost(obj, (response) => {
            console.log(response);
            this.props.pushToNewsFeed(response);
        });
    }
    render() {
        return (
            <div>
                <article className="CreatePost" ref="CreatePost">
                    <div className = "CreatePost-header">
                        <span> Create Post! </span>
                    </div>
                    <form onSubmit = {this.handleSubmit}>
                        <div><label> Insert a Caption </label><input value = {this.state.caption} onChange = {this.handleCaptionChange}/></div>
                        <button style = {{width: "100%"}} type = "submit" className = "blue btn-flat right white-text"> 
                            Post
                            <i className="material-icons right"> done </i>
                        </button>
                    </form>
                </article>
            </div>
        ) ;
    }
}


export default CreatePost;