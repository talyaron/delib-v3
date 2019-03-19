import m from 'mithril';
import DB from '../config';
import store from '../../../data/store';


var unsubscribe = {};

function getUserGroups(onOff, userId) {
    if (onOff == 'on') {
        DB.collection('users').doc(userId).collection('groupsOwned').onSnapshot(groupsOwnedDB => {

            //unsubsribe from previous listeners
            for (let i in unsubscribe) {
                unsubscribe[i]();
            }
            unsubscribe = {};

            const groupsNumber = groupsOwnedDB.size;
            let count = 0;
            var groupsObj = {}, groupsArray = [];

            groupsOwnedDB.forEach(groupOwnedDB => {

                //listen a group and update...
                unsubscribe[groupOwnedDB.data().id] = DB.collection('groups').doc(groupOwnedDB.data().id).onSnapshot(groupDB => {


                    let tempObj = groupDB.data();
                    tempObj.id = groupOwnedDB.id;

                    groupsObj[groupOwnedDB.data().id] = tempObj;
                    count++;


                    if (count == groupsNumber) { //first update
                        for (let i in groupsObj) {
                            groupsArray.push(groupsObj[i]);
                        }

                        store.userGroups = groupsArray;
                        m.redraw();

                    } else if (count > groupsNumber) { //net updates after initial update

                        //search in array and replace
                        let indexOfGroup = store.userGroups.findIndex(group => { return group.id === tempObj.id });
                        store.userGroups[indexOfGroup] = tempObj;
                        m.redraw()
                    }

                })

            })
        })
    } else {
        //turn off listeners
        for (let i in unsubscribe) {

            unsubscribe[i]();
        }

    }
}



function getQuestions(onOff, groupId, vnode) {
    if (onOff === 'on') {
        vnode.state.unsubscribe = DB.collection('groups').doc(groupId).collection('questions').onSnapshot(questionsDb => {
            questionsDb.forEach(questionDB => {
                if (questionDB.data().id) {
                    // set(store.questions, `[${groupId}][${questionDB.data().id}]`, questionDB.data())
                    setStore(store.questions, groupId, questionDB.data().id, questionDB.data());

                }
            })

            m.redraw();
        })
    } else {
        vnode.state.unsubscribe();
    }
}

function setStore(obj, groupId, questionId, data) {

    if (!obj.hasOwnProperty(groupId)) {
        obj[groupId] = {};
        obj[groupId][questionId] = data
    } else {
        obj[groupId][questionId] = data
    }

}

function getGroupDetails(onOff, groupId, vnode) {
    if (onOff == 'on') {
        vnode.state.DetailsUnsubuscribe = DB.collection('groups').doc(groupId).onSnapshot(groupDB => {

            store.groups[groupId] = groupDB.data();

            m.redraw();
        })
    } else {
        vnode.state.DetailsUnsubuscribe();
    }
}

function getQuestionDetails(groupId, questionId, vnode) {

    let unsubscribe = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .onSnapshot(questionDB => {
            // set(store.questions, `[${groupId}][${questionId}]`, questionDB.data());
            setStore(store.questions, groupId, questionId, questionDB.data())

            m.redraw();
        })

    return unsubscribe;
}

function getOptions(groupId, questionId, order, vnode) {

    let optionRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('options');


    let orderBy = 'time'
    switch (order) {
        case "new":
            orderBy = 'time';
            break;
        case 'top':
            orderBy = 'consensusPrecentage';
            break;
        default:
            orderBy = 'time';
    }

    let unsubscribe = optionRef.orderBy(orderBy, 'desc').limit(20).onSnapshot(optionsDB => {
        let optionsArray = [];
        optionsDB.forEach(optionDB => {
            let optionObj = optionDB.data();
            optionObj.id = optionDB.id;

            //get before position
            let elm = document.getElementById(optionObj.id)
            if (elm) {
                store.optionsLoc[optionObj.id] = {
                    offsetTop: elm.offsetTop,
                    offsetLeft: elm.offsetLeft,
                    toAnimate: true,
                    new: false
                };

            } else {
                store.optionsLoc[optionObj.id] = { offsetTop: 0, offsetLeft: 0, toAnimate: false, new: true }
            }

            optionsArray.push(optionObj)
        })


        // store.options = optionsArray;
        vnode.state.optionsArr = optionsArray;

        m.redraw();

    })

    return unsubscribe;

}

function getOptionDetails(onOff, groupId, questionId, optionId) {
    let optionRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('options').doc(optionId);

    if (onOff === 'on') {
        optionRef.onSnapshot(optionDB => {
            store.optionsDetails[optionId] = optionDB.data();

            m.redraw();
        })
    } else {
        optionRef.onSnapshot(() => { })();
    }
}

function getOptionVote(groupId, questionId, optionId, creatorId) {
    let voteRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('options').doc(optionId)
        .collection('likes').doc(creatorId);


    let unsubscribe = voteRef.onSnapshot(voteDB => {

        if (voteDB.exists) {
            store.optionsVotes[optionId] = voteDB.data().like;
        } else {
            store.optionsVotes[optionId] = 0;
        }
        m.redraw();
    });
    return unsubscribe;

}



function getSubAnswers(groupId, questionId, subQuestionId, vnode) {
    let subAnswersRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('subQuestions').doc(subQuestionId)
        .collection('subAnswers')
        .orderBy("time", "desc").limit(100)


    unsubscribe = subAnswersRef.onSnapshot(subAnswersDB => {

        let subAnswersArr = [];
        subAnswersDB.forEach(subAnswerDB => {

            let subAnswerObj = subAnswerDB.data()

            subAnswerObj.id = subAnswerDB.id
            subAnswersArr.push(subAnswerObj)
        })


        vnode.state.subAnswers[subQuestionId] = subAnswersArr;
        m.redraw();
    });
    return unsubscribe;

}

function getMessages(onOff, groupId, questionId, optionId, vnode) {
    let messagesRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('options').doc(optionId)
        .collection('messages');

    if (onOff === 'on') {
        messagesRef.orderBy('time', 'desc').onSnapshot(messagesDB => {
            let messagesArray = [];

            let numberOfMessages = messagesDB.size
            messagesDB.forEach(messageDB => {
                let tempMessage = messageDB.data();

                //check if message is new
                if (!vnode.state.messagesIds.hasOwnProperty(messageDB.id)) {

                    tempMessage.isNew = true;
                } else {
                    tempMessage.isNew = false;
                }

                messagesArray.unshift(tempMessage);
                vnode.state.messagesIds[messageDB.id] = true;
            })
            vnode.state.messages = messagesArray;
            // vnode.state.numberOfMessages = numberOfMessages;



            m.redraw();
        })
    } else {
        messagesRef.onSnapshot(() => { })();
    }
}


function getSubItems(subItemsType, groupId, questionId, vnode) {
    let subItemsRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection(subItemsType)


    unsubscribe = subItemsRef.orderBy('totalVotes', 'desc').onSnapshot(SubItemsDB => {

        SubItemsDB.docChanges().forEach(function (change) {

            if (change.type === "added") {
                vnode.state.subAnswersUnsb[change.doc.id] = getSubAnswers(groupId, questionId, change.doc.id, vnode) //listen to answers
            }

            if (change.type === "removed") {
                //unsubscribe from answers
            }
        });



        let subItemArr = [];
        SubItemsDB.forEach(SubItemDB => {



            let subItemObj = SubItemDB.data()

            subItemObj.id = SubItemDB.id
            subItemArr.push(subItemObj)
        })

        vnode.state[subItemsType] = subItemArr;
        m.redraw();
    });
    return unsubscribe;

}


function getSubItemLikes(subItemsType, groupId, questionId, subQuestionId, creatorId, vnode) {

    let subQuestionRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection(subItemsType).doc(subQuestionId)


    return subQuestionRef.onSnapshot(likeDB => {
        if (likeDB.data().totalVotes != undefined) {
            vnode.state.likes = likeDB.data().totalVotes;
        } else {
            vnode.state.likes = 0;
        }

        m.redraw();
    })
}

function getSubItemUserLike(subItemsType, groupId, questionId, subQuestionId, creatorId, vnode) {
    let subQuestionRef = DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection(subItemsType).doc(subQuestionId)
        .collection('likes').doc(creatorId);

    return subQuestionRef.onSnapshot(likeDB => {
        if (likeDB.exists) {
            if (likeDB.data().like == 1) {
                vnode.state.up = true
            } else {
                vnode.state.up = false
            }
        } else {
            vnode.state.up = false

        }

        m.redraw();
    })
}

function listenToFeeds() {
    if (store.user.hasOwnProperty('uid')) {
        let feedsRef = DB.collection('users').doc(store.user.uid).collection('feeds');
        feedsRef.onSnapshot((feedsDB => {

            feedsDB.docChanges().forEach(feedDB => {
                //listen to changes


                let path = feedDB.doc.data().path;

                if (feedDB.type === "added") {
                    listenToFeed(path);
                } else if (feedDB.type === "removed") {
                    listenToFeed(path, 'off');

                }
            })
        }))
    } else {
        console.error('User is not logged in and I can not subscribe to his/her feeds')
    }

}

function listenToFeed(path, onOff = 'on') {
    if (onOff === 'on') {
        let path1 = path;
        path = path.replace(/--/g, '/')
        let feedRef = DB.collection(path)

        //for how long should a message appear in the feed
        let timeOfActiveMessage = 1 * 24 * 3600 * 1000;
        let timePassed = new Date().getTime() - timeOfActiveMessage;



        store.feedsSubscribe[path1] = feedRef
            .where('timeSeconds', '>', timePassed)
            .orderBy("timeSeconds", "desc").limit(1).onSnapshot(feedsDB => {
                feedsDB.forEach(feedDB => {

                    if (feedDB.data().time !== null) {
                        let newFeed = feedDB.data();

                        newFeed.path = path1
                        store.feed.push(newFeed);
                        m.redraw();
                    }
                })
            })

    } else {
        //unsubscribe
        console.log('unsubscribe from ', path)
        store.feedsSubscribe[path]();
        delete store.feedsSubscribe[path];
    }
}
module.exports = {
    getUserGroups,
    getQuestions,
    getGroupDetails,
    getQuestionDetails,
    getOptions,
    getOptionVote,
    getSubItems,
    getSubItemLikes,
    getSubItemUserLike,
    getSubAnswers,
    getOptionDetails,
    getMessages,
    listenToFeeds
}