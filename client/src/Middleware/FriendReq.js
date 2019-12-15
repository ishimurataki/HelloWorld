import axios from 'axios' 
class FriendReq{
    constructor() {
    }
    async acceptFriendRequest(obj) {
        var response = await axios.post('/api/acceptFriendRequest', obj);
        return response.data;
    }
    // to do
    async getAllFriendRequests(obj) {
        var response = await axios.post('/api/getAllFriendReqs', obj);
        // var sampleData = [
        //     "TakiM", "Matt"
        // ]
        return response.data;
    }
}

export default new FriendReq();