import m from 'mithril';
import DB from '../config';
import store from '../../../data/store';

function getUserGroups(userId) {
    DB.collection('users').doc(userId).collection('groupsOwned').onSnapshot(groupsOwnedDB => {
        const groupsNumber = groupsOwnedDB.size;
        let count = 0;
        console.log(groupsNumber)
        let groupArray = [];
        groupsOwnedDB.forEach(groupOwnedDB => {
            //listen to the groups and update...
            DB.collection('groups').doc(groupOwnedDB.data().id).onSnapshot(groupDB => {
                // console.log(groupDB.data());
                groupArray.push(groupDB.data());
                console.dir(store.userGroups)
                count++;
                console.log(count)
                if (count == groupsNumber) {
                    store.userGroups = groupArray;

                    m.redraw();
                    console.log(store.userGroups)
                }

            })
        })



    })
}

module.exports = { getUserGroups }