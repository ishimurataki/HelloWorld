import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../../Middleware/Auth';
import Search from './Search';
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
        if(localStorage.getItem("token")) {
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
    renderSearch() {
        var username = localStorage.getItem("token")
        if(username) {
            return <Search username = {username}/>
        }
    }
    render () {
        return (
            <nav>
                <div className = "blue nav-wrapper"> 
                    <ul className = "right"> 
                        {this.renderContent()}
                    </ul>
                    <ul className = "left">
                        {this.renderSearch()}
                    </ul>
                </div>
            </nav>
            
        )
    }
}
export default withRouter(Header);