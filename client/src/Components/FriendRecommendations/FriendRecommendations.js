import React, { Component } from 'react';
import friendRec_middleware from '../../Middleware/FriendRec';
import FriendRecommendation from './FriendRecommendation';

class FriendRecommendations extends Component {
    state = {
        friendRecommendations: []
    }

    async componentDidMount() {
        var obj = {username: this.props.username};
        var friendRecommendations = await friendRec_middleware.getAllFriendRecommendations(obj);
        this.setState({friendRecommendations: friendRecommendations})
    }

    renderContent() {
        return this.state.friendRecommendations.map((friendRecommendation) => {
            var recipient = friendRecommendation;
            var key = this.props.username + recipient;
            return <FriendRecommendation sender = {this.props.username} recipient = {recipient} key = {key}/>
        })
    }

    render () {
        return (
            <div style = {{marginTop: '100px', backgroundColor: "lightBlue", 
            paddingTop: "2px", paddingBottom: "2px",
            paddingLeft: "2px", paddingRight: "2px"}}>
                <h4> Friend Recs! </h4> 
                {this.renderContent()}
            </div>
        )
    }
}

export default FriendRecommendations;