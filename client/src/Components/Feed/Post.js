import React from 'react';
import './Post.css';
import CommentSection from './CommentSection';

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      imageDescription: "",
      imageUrl: "",
      postUser: "",
      time: "",
      id: ""
    }
  }
  componentDidMount() {
    this.setState({
      caption: this.props.data.caption,
      imageUrl: this.props.data.imageUrl,
      postUser: this.props.data.postUser,
      imageDescription : this.props.data.imageDescription,
      time: this.props.data.time,
      id: this.props.id
    });
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
                  Posted on {this.state.time}
                </div>
              </div>
              {this.renderImage()}
              <div className="Post-caption">
                {this.state.caption}
              </div>
              <CommentSection postId = {this.state.id}/>
          </article>
        </div>

    )
  }
}

export default Post