import axios from 'axios'
import { ADD_CHAT, REMOVE_CHAT, CLEAR_CHATS, SET_FRIENDS, GET_FRIENDS, FETCH_USER} from './types';


export const addChat = (sender, members) => async dispatch => {
    const name = members.sort().join(', ');
    const data = {name, sender, members};
    dispatch({ type: ADD_CHAT, payload: data});
}

export const removeChat = (name) => async dispatch => {
    var data = {name};
    dispatch({type: REMOVE_CHAT, payload: data});
}

export const fetchUser = () => async dispatch  => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); 
};

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

