import m from 'mithril';
import DB from '../config';
import store from '../../../data/store';

function getUserGroups(userId) {
    DB.collection('users').doc(userId).collection('groupsOwned').onSnapshot(groupsOwnedDB => {
        const groupsNumber = groupsOwnedDB.size;
        let count = 0;
       
        let groupArray = [];
        groupsOwnedDB.forEach(groupOwnedDB => {
            //listen to the groups and update...
            DB.collection('groups').doc(groupOwnedDB.data().id).onSnapshot(groupDB => {
              
                groupArray.push(groupDB.data());               
                count++;
                
                if (count == groupsNumber) {
                    store.userGroups = groupArray;
                    m.redraw();
                   
                }

            })
        })



    })
}

module.exports = { getUserGroups }