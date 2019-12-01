import React, { Component } from 'react'
import './CreatePost.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: ""
        };
    }

    handleCaptionChange() {

    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Creating post");
    }
    render() {
        return (
            <div>
                <article className="CreatePost" ref="CreatePost">
                    <div className = "CreatePost-header">
                        <span> Create Post! </span>
                    </div>
                    <form onSubmit = {e => this.handleSubmit(e)}>
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