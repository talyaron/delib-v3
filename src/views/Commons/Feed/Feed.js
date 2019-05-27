import m from 'mithril';
import './Feed.css';

import FeedContent from './Sub/FeedContent';

import store from '../../../data/store';

module.exports = {
    oninit: vnode => {
        vnode.state = {
            orderdFeed: [],

        }
    },
    oncreate: vnode => {
        // if (store.showFeed == false) {
        //     document.getElementById('feedBox').style = 'display:none';
        //     setTimeout(() => {
        //         document.getElementById('feedBox').style = 'display:block';
        //     }, 2000)

        // }
    },
    onbeforeupdate: vnode => {

        orderFeed(vnode);

    },

    view: (vnode) => {

        return (
            <div>
            {store.showFeed?
            <div
                id='feedBox'
                class='feedBox'
                onclick={() => { store.showFeed = !store.showFeed }}
            >
                <div class='feedWrapper'>
                    {
                        vnode.state.orderdFeed.map((content, index) => {
                            return <FeedContent
                                data={content}
                            />
                        })
                    }
                </div>

            </div>
            :
            <div />
                }
            </div>

        )
    }
}

function orderFeed(vnode) {
    vnode.state.orderdFeed = [];

    for (let i in store.feed) {
        vnode.state.orderdFeed.push(store.feed[i]);
    }
    vnode.state.orderdFeed.sort(function (a, b) {
        return b.timeSeconds - a.timeSeconds;
    });

}




