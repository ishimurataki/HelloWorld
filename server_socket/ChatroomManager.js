const Chatroom = require('./Chatroom.js');

module.exports = () => {
    const chatrooms = new Map();
    chatrooms.set('TestRoom', Chatroom('TestRoom'));

    removeClient = (client) => {
        chatrooms.forEach(c => c.removeUser(client));
    }

    getChatroomByName = (chatroomName) => {
        return chatrooms.get(chatroomName)
    }

    getAvailableChatrooms = () => {
        return chatrooms.keys;
    }

    serializeChatrooms = () => {
        return Array.from(chatrooms.values()).map(c => c.serialize())
    }

    return {
        removeClient,
        getChatroomByName,
        serializeChatrooms,
        getAvailableChatrooms
    }
}