var dynamo = require('dynamodb');
const Chat = require('../models/Chat')(dynamo);
const Chatroom = require('../models/Chatroom')(dynamo)

const getChats = async (chatroomID, timestamp) => {
    return await new Promise((resolve, reject) => {
        Chat.query(chatroomID).where('timestamp').lt(timestamp).descending().limit(2).exec((err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const chat = response.Items.map((c) => c.attrs.content);
                resolve(chat);
            }
        })
    })
}

const addChat = async (chatroomID, timestamp, content) => {
    const chat = new Chat({ chatroomID, timestamp, content });
    try {
        await chat.save();
        console.log('Added chat msg "' + content + '" to ' + chatroomID);
    } catch (e) {
        throw e;
    }
}

const getChatrooms = async (username) => {
    return await new Promise((resolve, reject) => {
        Chatroom.query(username).exec((err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('WE MADE IT HERE');
                let chatRooms = response.Items.filter((c) => c.attrs.active === 'true');
                chatRooms = chatRooms.sort((a,b) => a.attrs.timestamp > b.attrs.timestamp).map((c) => c.attrs.chatroomID);
                resolve(chatRooms);
            }
        })
    })
}

const addChatroom = async (username, chatroomID) => {
    try {
        const acc = new Chatroom ({username, chatroomID, timestamp:new Date().getTime(), active : 'true'});
        await acc.save();
    } catch (e) {
        throw e;
    }
}

const updateChatroom = async (username, chatroomID) => {
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, timestamp:new Date().getTime()}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                resolve(acc);
            }
        })
    })
}

const deleteChatroom = async (username, chatroomID) => {
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, active:'false'}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                resolve(acc);
            }
        })
    })
}

module.exports = {
    getChats,
    addChat,
    getChatrooms,
    addChatroom,
    updateChatroom,
    deleteChatroom
}