import { combineReducers } from 'redux'
import chatReducer from './chatReducer';
import suggestReducer from './suggestReducer';
import authReducer from './authReducer';

export default combineReducers({
    chat: chatReducer,
    friends: suggestReducer,
    auth: authReducer
})