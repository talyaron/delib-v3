import m from 'mithril';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import values from 'lodash/values';

import './Team.css';

import Header from '../Commons/Header';
import Card from '../Commons/Card/Card';

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        getTeamDetials('on', vnode);
        getIssues(vnode);

        vnode.state = {
            issues: [],

        }
    },
    onbeforeupdate: (vnode) => {
        getTeamsFromStore(vnode);
    },
    onremove: vnode => {
        getTeamDetials('off', vnode);
    },
    view: (vnode) => {
        return (
            <div class='page'>
                <Header
                    topic='צוות'
                    title={store.current.team.title}
                    tabBkgColor='white'
                    color='blue'
                />
                <div class='cardsContainer row' dir='rtl'>
                    {
                        vnode.state.issues.map((item, i) => {

                            return (
                                <Card
                                    title={item.details.title || ''}
                                    explanation={item.details.explanation || ''}
                                    linkText='לנושא'
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

function getTeamDetials(onOff, vnode) {
    if (onOff === 'on') {
        DB.child('delib-v3/teams/' + vnode.attrs.id + '/details/title').on('value', (detailsDB) => {

            store.current.team.title = vnode.state.title = detailsDB.val() || 'אין שם לצוות';
            console.log(vnode.state.title)
            m.redraw();
        })
    } else {
        DB.child('delib-v3/teams/' + vnode.attrs.id + '/details/title').off
    }
}

function getIssues(vnode) {

    DB.child('delib-v3/teams/' + vnode.attrs.id + '/issuesToListen').on('child_added', issuesToListen => {

        set(store, 'orgs[' + issuesToListen.val().org + '.teams[' + vnode.attrs.id + '].issues[' + issuesToListen.key + '].listen', true);

        listenToIssue('on', issuesToListen.key, issuesToListen.val().org, vnode);
    })
}

function listenToIssue(onOff, issue, org, vnode) {

    if (onOff == 'on') {
        DB.child('delib-v3/issues/' + issue + '/details').on('value', issueDetails => {
            if (issueDetails.exists()) {
                set(store, 'orgs[' + org + '.teams[' + vnode.attrs.id + '].issues[' + issue + ']', {
                    details: issueDetails.val(),
                    id: issue
                });
                console.dir(store)
                m.redraw();
            } else {
                omit(store, issue, 'orgs[' + org + '.teams[' + vnode.attrs.id + '].issues');

                console.error('listenToIssue: Issue', issue, 'in team', vnode.attrs.id, 'does not exists')
            }

        })
    }
    if (onOff == 'off') {
        DB.child('delib-v3/issues/' + issue + '/details').off('value');
    }

}

function getTeamsFromStore(vnode) {

    var issuesInStore = get(store, 'teams[' + vnode.attrs.id + '].issues', {});
    vnode.state.issues = values(issuesInStore);

}