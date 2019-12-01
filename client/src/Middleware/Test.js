// solely for testing backend functionalities
import axios from 'axios' 
class Test{
    constructor() {
    }

    async testPostCall() {
        console.log("fetching test post");
        //replace this with the info you want to send in req.body
        var obj ={};
        // replace this with the api call you're testing
        //const res = await axios.post('/api/checklogin', obj);
        //const value = res.data;
        // fake data for now
        //console.log(res);
    }
}

export default new Test();