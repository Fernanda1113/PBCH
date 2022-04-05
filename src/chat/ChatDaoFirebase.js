const ContainerFirebase = require ("../../container/ContainerFirebase")

class ChatDaoFirebase extends ContainerFirebase {

    constructor() {
        super('chat')
    }
}

module.exports = ChatDaoFirebase