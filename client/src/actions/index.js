import axios from 'axios'
import { ADD_CHAT, CLEAR_CHATS} from './types';

export const addChat = (user1, user2) => async dispatch => {
    var data = { user1: user1, user2: user2};
    dispatch({ type: ADD_CHAT, payload: data});
}

export const clearChats = () => async dispatch => {
    dispatch({ type: CLEAR_CHATS});
}