var dynamo = require('dynamodb');
const Chat = require('../models/Chat')(dynamo);

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

// const addChat = (chatroomID, timestamp, content, cb) => {
//     console.log('Adding chat msg "' + content + '" to ' + chatroomID);
//     const chat = {
//         chatroomID,
//         timestamp, 
//         content
//     };
//     Chat.create([chat], (err, response) => {
//         if (err) {
//             cb ()
//         } else {
//             console.log('Added chat msg "' + content + '" to ' + chatroomID);
//             return response;
//         }
//     })
// }

module.exports = {
    getChats,
    addChat
}