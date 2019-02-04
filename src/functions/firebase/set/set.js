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

function createQuestion(groupId, creatorId, title, description) {

    DB.collection('groups').doc(groupId).collection('questions').add({
        title: title,
        description: description,
        time: new Date().getTime()
    }).then(something => {
        DB.collection('groups').doc(groupId).collection('questions').doc(something.id).update({ id: something.id })
        console.log(something.id)
        console.log('writen succesufuly')
    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });

}

function createOption(groupId, questionId, creatorId, title, description) {
    console.log(groupId, questionId, creatorId, title, description);
    DB.collection('groups').doc(groupId).collection('questions').doc(questionId).collection('options')
        .add({
            groupId, questionId, creatorId, title, description, time: new Date().getTime()
        }).then(newOption => {
            DB.collection('groups').doc(groupId)
                .collection('questions').doc(questionId)
                .collection('options').doc(newOption.id).update({ id: newOption.id })
            console.log('new option created:', newOption.id);
            console.dir(newOption)
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function setLike(groupId, questionId, optionId, creatorId, like) {
    DB.collection('groups').doc(groupId).collection('questions').doc(questionId)
        .collection('options').doc(optionId).collection('likes').doc(creatorId).set({ like })
        .then(newLike => {           
           
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function setMessage(groupId, questionId, optionId, creatorId, creatorName, message) {
    DB.collection('groups').doc(groupId).collection('questions').doc(questionId)
        .collection('options').doc(optionId).collection('messages').add({
            creatorId,
            creatorName,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            message
        }).then(messageDB => {
            
           
        }).catch(error => {
            console.log('Error:', error)
        })
}

module.exports = { createGroup, createQuestion, createOption, setLike, setMessage }