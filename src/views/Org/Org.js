import m from 'mithril';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import values from 'lodash/values';

import './Org.css';

import Header from '../Commons/Header';
import Card from '../Commons/Card/Card';

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        getOrgDetials(vnode)
        getTeams(vnode)

        vnode.state = {
            teams: []
        }
    },
    onbeforeupdate: (vnode) => {
        setteamsFromStore(vnode);
    },
    view: (vnode) => {
        return (
            <div class='page'>
                <Header
                    topic='ארגון'
                    name={store.current.org.title}
                    tabBkgColor='#03077b'
                    color='white'
                />

                <div class='cardsContainer row' dir='rtl'>
                    {
                        vnode.state.teams.map((item, i) => {
                            console.log('item', item)
                            return (
                                <Card
                                    title={item.details.title || ''}
                                    explanation={item.details.explanation || ''}
                                    linkText='לדף הקבוצה'
                                    id={item.id}
                                    key={i} />
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}

function getOrgDetials(vnode) {

    DB.child('delib-v3/orgs/' + vnode.attrs.id + '/details/name').on('value', (detailsDB) => {
        store.current.org.title = vnode.state.title = detailsDB.val() || 'אין שם לארגון';
        m.redraw();
    })
}

function getTeams(vnode) {
    DB.child('delib-v3/orgs/' + vnode.attrs.id + '/teamsToListen').on('child_added', teamsToListen => {

        set(store, 'orgs[' + vnode.attrs.id + '].teams[' + teamsToListen.key + '].listen', true);
        listenToIssue('on', teamsToListen.key, vnode);
    })
}

function listenToIssue(onOff, issue, vnode) {
    if (onOff == 'on') {
        DB.child('delib-v3/teams/' + issue + '/details').on('value', issueDetails => {
            if (issueDetails.exists()) {
                set(store, 'orgs[' + vnode.attrs.id + '].teams[' + issue + ']', {
                    details: issueDetails.val(),
                    id: issue
                })
                m.redraw();
            } else {
                omit(store, issue, 'orgs[' + vnode.attrs.id + '].teams');

                console.error('listenToIssue: Issue', issue, 'in organizaion', vnode.attrs.id, 'does not exists')
            }

        })
    }
    if (onOff == 'off') {
        DB.child('delib-v3/teams/' + issue + '/details').off('value');
    }

}

function setteamsFromStore(vnode) {

    var teamsInStore = get(store, 'orgs[' + vnode.attrs.id + '].teams', {});
    vnode.state.teams = values(teamsInStore);
    console.dir(vnode.state.teams)
}