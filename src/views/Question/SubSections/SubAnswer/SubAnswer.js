import m from 'mithril';

import './SubAnswer.css';

module.exports = {
    oninit: (vnode) => {

    },
    oncreate: vnode => {

    },
    onupdate: vnode => {

    },
    onremove: vnode => {

    },
    view: (vnode) => {
        return (
            <div class='subAnswerCard'>
                <div class='subAnswerText'>{vnode.attrs.text}</div>
                <div class='subAnswerAuthor'>{vnode.attrs.author} {vnode.attrs.time}</div>
            </div>
        )
    }
}

