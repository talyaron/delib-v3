import m from 'mithril';

import './SubAnswer.css';

module.exports = {
    oninit: vnode => {
        console.log('init')
        console.dir(vnode.attrs)
    },
    oncreate: vnode => {

    },
    onupdate: vnode => {
        console.dir(vnode.attrs)
    },
    onremove: vnode => {

    },
    view: vnode => {
        return (
            <div class='subAnswerCard'>
                <div class='subAnswerText'>{vnode.attrs.text}</div>
                <div class='subAnswerAuthor'>{vnode.attrs.author}</div>
            </div>
        )
    }
}

