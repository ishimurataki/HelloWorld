import axios from 'axios' 
class Auth {
    constructor() {
        this.authenticated = false;
    }

    async login (obj, callback) {
        console.log("begin login sequence");
        console.log(obj);
        const res = await axios.post('/api/checklogin', obj);
        const value = res.data;
        if(value === "success") {
            this.authenticated = true;
        }
        callback(value);
    }

    logout(callback) {
        this.authenticated = false;
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
        return this.authenticated
    }
}

export default new Auth();