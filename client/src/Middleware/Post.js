import axios from 'axios' 
class Post{
    constructor() {
    }

    async createPost (obj) {
        
    }

    async fetchPostData (obj) {
        console.log("fetching posts");
        console.log(obj);
        //const res = await axios.post('/api/checklogin', obj);
        //const value = res.data;
        // fake data for now
        var post1 = {
            caption: "Hello",
            creator: "Vinke",
            id: "1",
            time: "11-20-19"
        }
        var post2 = {
            caption: "Hello2",
            creator: "Vinke",
            id: "2",
            time: "11-20-19"
        }
        var data = [post1, post2]
        const response = {result: "Success", data: data}
        return response;
    }
}

export default new Post();