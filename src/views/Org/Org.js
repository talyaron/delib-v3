import m from 'mithril';
import './Org.css';
import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        getOrgDetials(vnode)

    },
    oncreate: (vnode) => {

        var instance = M.Tabs.init(document.getElementById('orgNavTab'), {});
    },
    view: (vnode) => {
        return (
            <div class='headers'>
                <div class='orgHeader'>{store.current.org.name}</div>
                <div class='navSubHeaders'>
                    <ul id='orgNavTab' class="tabs">
                        <li class="tab col s3"><a>Test 4</a></li>
                        <li class="tab col s3"><a class="active">Test 2</a></li>
                        <li class="tab col s3"><a>Test 4</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

function getOrgDetials(vnode) {

    DB.child('delib-v3/orgs/' + vnode.attrs.id + '/details/name').on('value', (detailsDB) => {
        store.current.org.name = vnode.state.name = detailsDB.val() || 'אין שם לארגון';
        m.redraw();
    })
}