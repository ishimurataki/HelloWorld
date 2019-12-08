import { ADD_CHAT, CLEAR_CHATS} from '../actions/types'
export default function(state = [], action) {
    switch (action.type) {
        case ADD_CHAT:
            var newChat = action.payload;
            if(!state.includes(newChat)) {
                return [
                    ...state,
                    newChat
                ]
            } 
        case CLEAR_CHATS: 
            return [];
        default: 
            return state;
    }
}