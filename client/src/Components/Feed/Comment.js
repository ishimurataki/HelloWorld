import React, { Component } from 'react'
class Comment extends Component {
    render () {
        var { creator, date, content} = this.props.data;
        return (
            <div> 
                Created by { creator } on { date}. The content is { content } 
            </div>
        )
    }
}

export default Comment;