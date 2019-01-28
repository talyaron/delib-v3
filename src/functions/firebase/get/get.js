import m from 'mithril';
import DB from '../config';
import store from '../../../data/store';
import { set } from 'lodash';

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
                    set(store.questions, `[${groupId}][${questionDB.data().id}]`, questionDB.data())
                }
            })

            m.redraw();
        })
    } else {
        vnode.state.unsubscribe();
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

function getQuestionDetails(onOff, groupId, questionId, vnode) {
    if (onOff == 'on') {
        vnode.state.questionUnsubscribe = DB
            .collection('groups').doc(groupId)
            .collection('questions').doc(questionId)
            .onSnapshot(questionDB => {
                set(store.questions, `[${groupId}][${questionId}]`, questionDB.data());
                m.redraw();
            })
    } else {
        var unsubscribe = DB
            .collection('groups').doc(groupId)
            .collection('questions').doc(questionId)
            .onSnapshot(function () { })()
        console.dir(vnode.state.questionUnsubscribe)
        // unsubscribe();
    }
}

function getOptions(groupId, questionId) {
    
    DB.collection('groups').doc(groupId)
        .collection('questions').doc(questionId)
        .collection('options')
        .onSnapshot(optionsDB => {
            let optionsArray = [];
            optionsDB.forEach(optionDB => {
                optionsArray.push(optionDB.data())
            })
           
            store.options = optionsArray;
            m.redraw()
        })
}

module.exports = { getUserGroups, getQuestions, getGroupDetails, getQuestionDetails, getOptions }