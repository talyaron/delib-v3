import m from 'mithril';
import './Group.css';


module.exports = {

    view: (vnode) => {

        return (
            <div class='card groupCard' onclick={() => { m.route.set(vnode.attrs.route + vnode.attrs.id) }}>
                <div class='cardTitle'>{vnode.attrs.title}</div>
                <div class='cardDescription'>{vnode.attrs.description}</div>
            </div>
        )

    }
}

