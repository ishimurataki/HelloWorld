import axios from 'axios' 
class Post{
    constructor() {
    }

    async createPost (obj, callback) {
        console.log("creating post");
        const res = await axios.post('/api/addNewPost', obj);
        console.log(res);
        callback(res);
    }

    async fetchPostData (obj) {
        console.log("fetching posts");
        const res = await axios.post('/api/getAllPosts', obj);
        var val = res.data;
        return val;
        // fake data for now
        // var post1 = {
        //     caption: "Hello",
        //     creator: "Vinke",
        //     id: "1",
        //     time: "11-20-19"
        // }
        // var post2 = {
        //     caption: "Hello2",
        //     creator: "Vinke",
        //     id: "2",
        //     time: "11-20-19"
        // }
        // var data = [post1, post2]
        //const response = {result: "Success", data: data}
    }
}

export default new Post();