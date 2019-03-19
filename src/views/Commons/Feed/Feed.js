import m from 'mithril';
import './Feed.css';

import FeedContent from './Sub/FeedContent';

import store from '../../../data/store';

module.exports = {

    view: (vnode) => {
        console.log(store.feed)
        return (
            <div class='feedBox'>
                <div class='feedWrapper'>
                    {
                        store.feed.map((content, index) => {
                            return <FeedContent
                                message={content.message}
                                creatorName={content.creatorName}
                                path={content.path}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}




