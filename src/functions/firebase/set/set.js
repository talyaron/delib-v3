import DB from '../config';

function createGroup(creatorId, title, description) {

    DB.collection('groups').add({
        title: title,
        description: description,
        creatorId: creatorId,
        time: new Date().getTime()
    }).then(function (docRef) {
        DB.collection('users').doc(creatorId).collection('groupsOwned').doc(docRef.id).set({
            id: docRef.id,
            date: new Date().getTime()
        })
    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

module.exports = { createGroup }