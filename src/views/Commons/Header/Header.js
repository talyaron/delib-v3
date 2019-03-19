import m from 'mithril';
import './Header.css';

import { addToFeed } from '../../../functions/firebase/set/set';

module.exports = {

    view: (vnode) => {

        return (
            <header id='headerContainer'>
                <div class='headerContainer' >
                    {vnode.attrs.upLevelUrl ?
                        <div class='headerBack' onclick={(e) => {
                            e.stopPropagation();
                            m.route.set(vnode.attrs.upLevelUrl)
                        }}>
                            <img src='img/icons8-undo-32.png' />
                        </div>
                        :
                        <div class='headerEmptyBack' />
                    }

                    <div class='headerTitle'>
                        {vnode.attrs.topic}: {vnode.attrs.title}
                    </div>
                    <div
                        class='headerSetFeed'
                        onclick={(e) => {
                            e.stopPropagation();
                            addToFeed(
                                [
                                    'groups', vnode.attrs.groupId,
                                    'questions', vnode.attrs.questionId,
                                    'options', vnode.attrs.optionId,
                                    'messages'
                                ],
                                'collection')
                        }}><img src='img/icons8-news-feed-32.png' />
                    </div>
                    <div class='headerMessage'>
                        <img src='img/icons8-secured-letter-32.png' />
                        <div class='headerMesaggeCounter'>42</div>
                    </div>
                </div>
                {!vnode.attrs.option == undefined ?
                    <div class='chatOptionHeader'>
                        אופציה: {vnode.attrs.option}
                    </div>
                    :
                    <div />
                }

            </header>
        )
    }
}




