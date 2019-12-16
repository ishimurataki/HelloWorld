import axios from 'axios' 
class ChatBar{
    constructor() {
    }
    // need to test this
    async fetchAllOnlineFriends(obj) {
        console.log("fetching chat bar info");
        console.log(obj);
        const res = await axios.post('/api/getAllOnlineFriends', obj);
        return res.data;
    }
}

export default new ChatBar();