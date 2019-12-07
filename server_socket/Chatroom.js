module.exports = ({name, image}) => {
    const members = new Map();
    let chatHistory = [];

    broadcastMessage = (message) => {
        members.forEach(m => {
            console.log('message sent from server')
            m.emit('message', message)
        });
    }

    addEntry = (entry) => {
        chatHistory = chatHistory.concat(entry);
    }

    getChatHistory = () => {
        return chatHistory.slice();
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