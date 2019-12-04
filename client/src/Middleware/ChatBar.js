import axios from 'axios' 
class ChatBar{
    constructor() {
    }

    async fetchAllOnlineFriends(obj) {
        console.log("fetching chat bar info");
        console.log(obj);
        const res = await axios.post('/api/getAllOnlineFriends', obj);
        return res;
    }
}

export default new ChatBar();