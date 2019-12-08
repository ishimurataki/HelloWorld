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

    handleEvent = (chatroomName, createEntry) => {
        return ensureValidChatroom(chatroomName)
            .then((chatroom) => {
                const entry = {client : client.id, ...createEntry() };
                chatroom.addEntry(entry);

                chatroom.broadcastMessage({chat: chatroomName, ...entry });
                return chatroom;
            })
    }

    return handleEvent;
}

module.exports = (client, clientManager, chatroomManager) => {
    const handleEvent = makeHandleEvent(client, clientManager, chatroomManager);
    handleJoin = (chatroomName, cb) => {
        const createEntry = () => ({ msg: `joined ${chatroomName}`});

        handleEvent(chatroomName, createEntry)
            .then((chatroom) => {
                chatroom.addClient(client);
                cb(null, chatroom.getChatHistory())
            })
            .catch(cb);
    }

    handleMessage = (chatroomName, message, cb) => {
        const createEntry = () => ({ msg: message});
        handleEvent(chatroomName, createEntry)
            .then((chatroom) => {
                console.log('Here')
                console.log(chatroom)
                cb(null, chatroom.getChatHistory())
            })
            .catch(cb);
    }

    return {
        handleJoin,
        handleMessage
    }
} 