makeHandleEvent = (client, clientManager, chatroomManager) => {

    ensureExists = (getter, rejectionMessage) => {
        return new Promise((resolve, reject) => {
            const res = getter();
            return res ? resolve(res) : reject(rejectionMessage);
        })
    }

    ensureValidChatroom = (chatroomName) => {
        return ensureExists(() => chatroomManager.getChatroomByName(chatroomName),
            `invalid chatroom name: ${chatroomName}`);
    }

    handleEvent = (chatroomName, username, createEntry) => {
        return ensureValidChatroom(chatroomName)
            .then((chatroom) => {
                const entry = { client: username, ...createEntry() };
                chatroom.addEntry(entry);

                chatroom.broadcastMessage({ chat: chatroomName, ...entry });
                return chatroom;
            })
    }

    return handleEvent;
}

module.exports = (client, clientManager, chatroomManager) => {

    const handleEvent = makeHandleEvent(client, clientManager, chatroomManager);

    handleJoin = (chatroomName, username, cb) => {
        const entry = { client: username, msg: `${username} joined ${chatroomName}` };
        const chatroom = chatroomManager.getChatroomByName(chatroomName);

        chatroom.addClient(client);
        chatroom.broadcastMessage({ chat: chatroomName, ...entry });
        chatroom.getChatHistory().then((chatHistory) => {
            console.log(chatHistory);
            cb(null, chatHistory);
        }).catch((e) => cb(e, null));
    }

    handleMessage = (chatroomName, sender, message, cb) => {

        const entry = { client : sender, msg : message };
        if (!chatroomManager.chatroomExists(chatroomName)) cb('Chatroom does not exist', null);
        const chatroom = chatroomManager.getChatroomByName(chatroomName);

        chatroom.addEntry(entry).then(() => {
            chatroom.broadcastMessage(entry);
            chatroom.getChatHistory();
        }).then((chatHistory) => {
            console.log(chatHistory);
            cb(null, chatHistory);
        }).catch(e => cb(e, null));

        // const createEntry = () => ({ msg: message });
        // handleEvent(chatroomName, sender, createEntry)
        //     .then((chatroom) => {
        //         cb(null, chatroom.getChatHistory())
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //     });
    }

    return {
        handleJoin,
        handleMessage
    }
} 