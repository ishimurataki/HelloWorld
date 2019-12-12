import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../../Middleware/Auth';
import Search from './Search';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class Header extends Component {
    state = {
        user: ''
    }

    handleLogout = (event) => {
        event.preventDefault();
        auth.logout(() => {
            console.log("Logging out");
            this.props.fetchUser();
            this.props.history.push("/");
        })
    }

    componentDidMount() {
        this.props.fetchUser();
    }
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            console.log(this.props.user);
            this.setState({          
                user: this.props.user
            });
        }
    }
    renderContent() {
        // lets just store login in windows lmao
        var path = "/"
        if (this.props.location) {
            path = this.props.location.state;
        }
        if(this.state.user) {
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
        if(this.state.user) {
            return <Search username = {this.state.user}/>
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
function mapStateToProps(state) {
    return { user: state.auth};
}
export default connect(mapStateToProps, actions)(withRouter(Header));