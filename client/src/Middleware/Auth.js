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
        }
        callback(value);
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    logout(callback) {
        this.authenticated = false;
        this.username = "";
        callback();
    }

    async signup(obj, callback) {
        console.log("adding new user");
        console.log(obj);
        const res = await axios.post('/api/signup', obj);
        const value = res.data;
        if(value === "success") {
            this.authenticated = true;
        }
        callback(value);
    }

    isAuthenticated () {
        return this.authenticated;
    }
}

export default new Auth();