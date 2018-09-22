import m from 'mithril';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import values from 'lodash/values';

import './Issue.css';

import Header from '../Commons/Header';
import Card from '../Commons/Card/Card';

import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        getIssueDetials('on', vnode);
        getOptoins(vnode);

        vnode.state = {
            issues: [],

        }
    },
    onbeforeupdate: (vnode) => {
        setIssuesFromStore(vnode);
    },
    onremove: vnode => {
        getIssueDetials('off', vnode);
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

function getIssueDetials(onOff, vnode) {
    if (onOff === 'on') {
        DB.child('delib-v3/issues/' + vnode.attrs.id + '/details/title').on('value', (detailsDB) => {

            store.current.team.title = vnode.state.title = detailsDB.val() || 'אין שם לצוות';
            console.log(vnode.state.title)
            m.redraw();
        })
    } else {
        DB.child('delib-v3/issues/' + vnode.attrs.id + '/details/title').off
    }
}

function getOptoins(vnode) {
    //?? how can we get the team?

    DB.child('delib-v3/issues/' + vnode.attrs.id + '/issuesToListen').on('child_added', optionsToListen => {

        set(store, 'teams[' + vnode.attrs.id + '].issues[' + vnode.attrs.id + '].options[' + optionsToListen.val().id + '+].listen', true);

        listenToOption('on', issuesToListen.key, vnode);
    })
}

function listenToOption(onOff, issue, vnode) {

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

                console.error('listenToOption: Issue', issue, 'in team', vnode.attrs.id, 'does not exists')
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

}