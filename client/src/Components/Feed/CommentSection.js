import React, { Component } from 'react'
import './CommentSection.css'
import CreateComment from './CreateComment';
import Comment from './Comment';
import comment_middleware from './../../Middleware/Comment';

class CommentSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        var obj = {postID: this.props.postID, date: this.props.postDate};
        var response = await comment_middleware.fetchCommentData(obj);
        //console.log(response);
        this.setState({data: response});
    }

    renderComments = (data) => {
        if(!data) {
            return <div> No Comments </div>
        } else {
            return data.map((postData) => {
                return <Comment key={postData.date} data= {postData}/>
            })
        }
    }
    // the response comes in as a list of length 1. In data? Not sure why but debug accordingly
    updateCommentSection = response => {
        this.setState(prevState => ({
            data: [response.data[0], ...prevState.data]
        }));
    }

    render () {
        var { data } = this.state;
        return (
            <div>
                <article className = "CommentSection">
                    <div>
                        {this.renderComments(data)}
                    </div>
                    <CreateComment updateCommentSection = {this.updateCommentSection} postID = {this.props.postID} postDate = {this.props.postDate} creator = {this.props.creator}/>
                </article>
            </div> 
        )
    }
}

export default CommentSection;