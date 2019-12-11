import axios from 'axios' 
class Comment{
    constructor() {
    }

    async getAllFriendRequests(obj) {
        var sampleData = [
            {sender: "Taki", username: "vinkebot"},
            {sender: "MattK", username: "vinkebot"}
        ]
        return sampleData;
    }
}

export default new Comment();