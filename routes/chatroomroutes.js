const chatsDb = require('../db/chatsdb');

const leaveChat = (req, res) => {
    const username = req.session.user;
    const chatroomID = req.chatroomID;

    chatsDb.removeChatroom(username, chatroomID);
    res.send('left successfully');
}

const getChatrooms = async (req, res) => {
    const chatrooms = await chatsDb.getChatrooms(req.session.user);
    res.send(chatrooms);
}

module.exports = {
    leaveChat, 
    getChatrooms
}

