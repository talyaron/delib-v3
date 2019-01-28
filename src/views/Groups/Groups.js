import m from 'mithril';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import values from 'lodash/values';

import './Groups.css';
import Group from './Group/Group';


//functions
import { getUserGroups } from '../../functions/firebase/get/get';
import { restrictedPage } from '../../functions/logins';
import { createGroup } from '../../functions/firebase/set/set';

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        store.lastPage = '/groups';
        sessionStorage.setItem('lastPage', store.lastPage);

        if (restrictedPage('/groups')) {
            getUserGroups('on', store.user.uid);
        }

    },
    onremove: vnode => {
        getUserGroups('off', store.user.uid);
    },
    view: (vnode) => {

        return (
            <div class='page'>
                <header class='groupsHeader'>דליב - קבוצות</header>
                <div class='wrapper groupsWrapper'>
                    {
                        store.userGroups.map((group, key) => {

                            return <Group
                                route='/group/'
                                title={group.title}
                                description={group.description}
                                id={group.id}
                                key={key} />
                        })
                    }
                </div>
                <div class='fav' onclick={() => { console.log(store.user.uid); createGroup(store.user.uid, 'some title', 'some description') }} >
                    <div>+</div>
                </div>
            </div>
        )
    }
}

