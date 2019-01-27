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

module.exports = { getUserGroups }