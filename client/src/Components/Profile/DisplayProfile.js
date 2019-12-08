import React, { Component } from 'react'

class DisplayProfile extends Component {
    render () {
        var profileInfo = this.props.profileInfo;
        //console.log(profileInfo);
        //console.log(this.props.currentUser);
        console.log("Rendering current profile for " + this.props.currentUser);
        return (
            <div style = {{marginTop: "100px"}}> 
                <div>
                    Email is {profileInfo.email}
                </div> 
                <div>
                    Birthday is {profileInfo.birthday ? profileInfo.birthday : 'Default'}
                </div>
                <div> 
                    Your full name is {profileInfo.firstname ? profileInfo.firstname : 'Default'}
                </div>
            </div>
        )
    }
}

export default DisplayProfile