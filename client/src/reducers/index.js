import { combineReducers } from 'redux'
import chatReducer from './chatReducer';
import suggestReducer from './suggestReducer';

export default combineReducers({
    chat: chatReducer,
    friends: suggestReducer
})