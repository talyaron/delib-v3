import m from 'mithril';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import values from 'lodash/values';

import './Team.css';

import Header from '../Commons/Header';
import Card from '../Commons/Card';

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        getTeamDetials(vnode)
        getIssues(vnode);

        vnode.state = {
            issues: []
        }
    },
    onbeforeupdate: (vnode) => {
        setteamsFromStore(vnode);
    },
    view: (vnode) => {
        return (
            <div class='page'>
                <Header
                    topic='צוות'
                    title={vnode.state.title}
                    tabBkgColor='white'
                    color='blue'
                />
                <div class='cardsContainer row' dir='rtl'>
                    {
                        vnode.state.issues.map((item, i) => {
                            console.log('item', item)
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

function getTeamDetials(vnode) {

    DB.child('delib-v3/teams/' + vnode.attrs.id + '/details/title').on('value', (detailsDB) => {

        store.current.team.title = vnode.state.title = detailsDB.val() || 'אין שם לצוות';
        m.redraw();
    })
}

function getIssues(vnode) {

    DB.child('delib-v3/teams/' + vnode.attrs.id + '/issuesToListen').on('child_added', issuesToListen => {
        console.log('gg', issuesToListen.key)
        set(store, 'teams[' + vnode.attrs.id + '].issues[' + issuesToListen.key + '].listen', true);

        listenToIssue('on', issuesToListen.key, vnode);
    })
}

function listenToIssue(onOff, issue, vnode) {
    console.log('listenToIssue', issue)
    if (onOff == 'on') {
        DB.child('delib-v3/issues/' + issue + '/details').on('value', issueDetails => {
            if (issueDetails.exists()) {
                set(store, 'teams[' + vnode.attrs.id + '].issues[' + issue + ']', {
                    details: issueDetails.val(),
                    id: issue
                })
                m.redraw();
            } else {
                omit(store, issue, 'teams[' + vnode.attrs.id + '].issues');

                console.error('listenToIssue: Issue', issue, 'in team', vnode.attrs.id, 'does not exists')
            }

        })
    }
    if (onOff == 'off') {
        DB.child('delib-v3/issues/' + issue + '/details').off('value');
    }

}

function setteamsFromStore(vnode) {

    var issuesInStore = get(store, 'teams[' + vnode.attrs.id + '].issues', {});
    vnode.state.issues = values(issuesInStore);
    console.dir(vnode.state.issues)
}