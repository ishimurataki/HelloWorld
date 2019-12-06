import axios from 'axios' 
class Auth {
    constructor() {
        // changed just because
        this.authenticated = false;
        this.username = "";
    }

    async login (obj, callback) {
        console.log("begin login sequence");
        console.log(obj);
        const res = await axios.post('/api/checklogin', obj);
        const value = res.data;
        // true for debugging
        // const value = "success"
        if(value === "success") {
            this.authenticated = true;
            localStorage.setItem("token", obj.username);
        }
        callback(value);
    }

    logout(callback) {
        this.authenticated = false;
        this.username = "";
        localStorage.removeItem("token");
        callback();

    }

    async signup(obj, obj2, callback) {
        console.log("adding new user");
        console.log(obj);
        const res = await axios.post('/api/signup', obj);
        const res2 = await axios.post('/api/addFriendship', obj2);
        const value = res.data;
        const value2 = res2.data;
        console.log("Result of friends" + value2);
        if(value === "success" && value2) {
            this.authenticated = true;
            localStorage.setItem("token", obj.username);
        }
        callback(value);
    }


}

export default new Auth();