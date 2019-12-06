import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import auth from './../../Middleware/Auth'
export const ProtectedRoute = ({ component: Component, ... rest}) => {
    return (
        <Route
         {...rest }
         render = {props => {
             if(localStorage.getItem("token")) {
                 return <Component {...props} />
             } else {
                 return <Redirect to= "/" />
             }
         }}
        />
    )
}