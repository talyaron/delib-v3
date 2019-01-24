import m from 'mithril';

import './Group.css';
// import store from '../../data/store';

module.exports = {

    view: (vnode) => {

        return (
            <div class='card groupCard'>
                <div class='cardTitle'>{vnode.attrs.title}</div>
                <div class='cardDescription'>{vnode.attrs.description}</div>
            </div>
        )
    }
}

