import React from 'react';
import './Post.css';
import CommentSection from './CommentSection';

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.data.content,
      imageUrl: this.props.data.imageUrl,
      creator: this.props.data.creator,
      imageDescription : this.props.data.imageDescription,
      postDate: this.props.data.date,
      postID: this.props.data.postID
    }
  }
  renderImage() {
    if(this.state.imageUrl && this.state.imageDescription) {
      return (
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt={this.state.imageDescription} src={this.state.imageUrl} />
          </div>
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
  }
  render() {
    return (
        <div> 
          <article className="Post" ref="Post">
              <div className = "Post-header">
                <header>
                  <div className="Post-user">
                    <div className="Post-user-nickname">
                      <span>Creator: {this.state.creator}</span>
                    </div>
                  </div>
                </header>
                <div className = "Post-time">
                  Posted on {this.state.postDate}
                </div>
              </div>
              {this.renderImage()}
              <div className="Post-caption">
                {this.state.content}
              </div>
              <CommentSection postID = {this.state.postID} postDate = {this.state.postDate} creator = {this.state.creator}/>
          </article>
        </div>

    )
  }
}

export default Post