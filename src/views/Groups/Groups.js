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

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        if (restrictedPage('/groups')) {
            getUserGroups(store.user.uid);
        }

    },

    view: (vnode) => {

        return (
            <div class='page'>
                <header class='groupsHeader'>דליב - קבוצות</header>
                <div class='wrapper'>
                    {
                        store.userGroups.map((group, key) => {
                           
                            return <Group
                                title={group.data.title}
                                description={group.data.description}
                                key={key} />
                        })
                    }
                </div>
            </div>
        )
    }
}

