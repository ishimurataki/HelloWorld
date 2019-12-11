import axios from 'axios'
import { ADD_CHAT, CLEAR_CHATS, SET_FRIENDS, GET_FRIENDS} from './types';

export const addChat = (name, user1, user2) => async dispatch => {
    var data = {name: name, user1: user1, user2: user2};
    dispatch({ type: ADD_CHAT, payload: data});
}

export const setActiveFriends = (options) => async dispatch => {
    var data = options;
    dispatch({type: SET_FRIENDS, payload: data});
}
export const getFriends = () => async dispatch => {
    dispatch({type: GET_FRIENDS});
}
export const clearChats = () => async dispatch => {
    dispatch({ type: CLEAR_CHATS});
}