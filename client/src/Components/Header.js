import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case true: 

            default: 
                const path = this.props.location.pathname;
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
function mapStateToProps(state) {
    return {auth: state.auth}
}
export default withRouter(connect(mapStateToProps) (Header));