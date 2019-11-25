import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import auth from './Auth/Auth';
class Header extends Component {
    handleLogout = (event) => {
        event.preventDefault();
        auth.logout(() => {
            console.log("Logging out");
            this.props.history.push("/");
        })
    }
    renderContent() {
        // lets just store login in windows lmao
        const path = this.props.location.pathname;
        if(auth.isAuthenticated()) {
            return ([
                <li key = "1"><div style = {{marginRight: "20px"}} onClick = {this.handleLogout}>Log out </div> </li>
            ])
        } else {
            if(path === "/login") {
                return ([
                    <li key = "1"><a href = '/signup'>Sign up </a> </li>,
                    <li key = "2"><a href = "/"> Back</a></li>
                ])
            } else if (path ==="/signup" ) {
                return ([
                    <li key = "1"><a href = '/login'>Login </a> </li>,
                    <li key = "2" ><a href = "/"> Back</a></li>
                ])
            } else {
                return ([
                    <li key = "1"><a href = '/login'>Login </a></li>,
                    <li key = "2"><a href = '/signup'>Sign up </a> </li>
                ]
                );
            }
        }
                
    }
    render () {
        return (
            <nav>
                <div className = "blue nav-wrapper"> 
                    <ul className = "right"> 
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
            
        )
    }
}
export default withRouter(Header);