import m from 'mithril';
import './Issue.css';

import Header from '../Commons/Header';

module.exports = {
    oninit: (vnode) => {

    },
    view: (vnode) => {
        return (
            <Header
                topic='נושא'
                name='ושא כל שהוא'
                tabBkgColor='white'
                color='#065206'
            />
        )
    }
}