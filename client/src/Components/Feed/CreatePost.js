import React, { Component } from 'react'
import './CreatePost.css'
import Post from './../../Middleware/Post'; 


class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: ""
        };
    }

    handleCaptionChange(event) {
        this.setState({caption: event.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Creating post");
        Post.CreatePost();
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
                        <button type = "submit" className = "blue btn-flat right white-text"> 
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