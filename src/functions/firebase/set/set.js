import DB from '../config';

function createGroup(creatorId, title, description) {
    console.log(creatorId, title, description)
    DB.collection('users').doc(creatorId).collection('groups').add({
        title: title,
        description: description,
        creatorId: creatorId
    })
}

module.exports = { createGroup }