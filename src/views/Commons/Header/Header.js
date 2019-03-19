import m from 'mithril';
import './Header.css';

module.exports = {

    view: (vnode) => {

        return (
            <header id='headerContainer'>
                <div class='headerContainer' >
                    {vnode.attrs.upLevelUrl ?
                        <div class='headerBack' onclick={() => { m.route.set(vnode.attrs.upLevelUrl) }}>
                            <img src='img/icons8-undo-32.png' />
                        </div>
                        :
                        <div class='headerEmptyBack' />
                    }
                    <div class='headerTitle'>
                        {vnode.attrs.topic}: {vnode.attrs.title}
                    </div>
                    <div class='headerMessage'><img src='img/icons8-secured-letter-32.png' /></div>
                </div>
                {!vnode.attrs.option == undefined ?
                    <div class='chatOptionHeader'>
                        אופציה: {vnode.attrs.option}
                    </div>
                    :
                    <div />
                }
                <div onclick={() => addToFeed(
                    [
                        'groups', vnode.attrs.groupId,
                        'questions', vnode.attrs.questionId,
                        'options', vnode.attrs.optionId,
                        'messages'
                    ],
                    'collection')}>Add to feed</div>
            </header>
        )
    }
}




