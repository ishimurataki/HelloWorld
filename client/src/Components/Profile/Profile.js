import React, { Component } from 'react'
import UpdateProfile from './UpdateProfile'
import DisplayProfile from './DisplayProfile'
class Profile extends Component {
    
    render () {
        return (
            <div>
                <UpdateProfile currentUser={this.props.username}/>
                <DisplayProfile currentUser = {this.props.username}/>
            </div>
        )
    }
}

export default Profile;