const chatsDb = require('../db/chatsdb')

module.exports = (name) => {

    const members = new Map();
    let currTimeStamp = new Date().getTime();
    let currChatHistory = [];
    let allChatHistory = [];
    let initialized = false;

    initialize = async () => {
        try {
            const data = await chatsDb.getChats(name, new Date().getTime());
            if (data.length > 0) {
                currChatHistory = data[0].map((c) => JSON.parse(c));
                allChatHistory = data.flat().map((c) => JSON.parse(c));
                currTimeStamp = parseInt(currChatHistory[0].timestamp);
            }
            initialized = true;
        } catch (e) {
            console.log(e)
        }
    }

    broadcastMessage = (message) => {
        members.forEach(m => {
            console.log('message sent from server')
            m.emit('message', message)
        });
    }

    addEntry = async (entry) => {
        const newEntry = {
            sender: entry.client,
            timestamp: new Date().getTime(),
            msg: entry.msg
        }
        if (currChatHistory.length >= 10) {
            const content = currChatHistory.map((c) => JSON.stringify(c));
            try {
                await chatsDb.addChat(name, currTimeStamp, content);
                currChatHistory = [];
            } catch (e) {
                console.log(e);
            }
        }
        currChatHistory = currChatHistory.concat(newEntry);
        allChatHistory = allChatHistory.concat(newEntry);
    }

    getChatHistory = async () => {
        if (!initialized) await initialize();
        return allChatHistory.slice();
    }

    addClient = (client) => {
        members.set(client.id, client);
    }

    removeClient = (client) => {
        members.delete(client.id);
    }

    serialize = () => {
        return {
            name, 
            image,
            numMembers: members.size
        }
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addClient,
        removeClient,
        serialize
    }
}