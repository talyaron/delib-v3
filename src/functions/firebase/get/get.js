import m from 'mithril';
import DB from '../config';
import store from '../../../data/store';

function getUserGroups(userId) {
    DB.collection('users').doc(userId).collection('groups').onSnapshot(groupsDB => {
        let groupArray = [];
        groupsDB.forEach(groupDB => {
            console.log(groupDB.data());
            groupArray.push({
                id: groupDB.id,
                data: groupDB.data()
            })
        })
        store.userGroups = groupArray;
        m.redraw();
        console.log(store.userGroups)


    })
}

module.exports = { getUserGroups }