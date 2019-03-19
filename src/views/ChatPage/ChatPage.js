//core
import m from 'mithril';

//Components
import Header from '../Commons/Header/Header';
import Feed from '../Commons/Feed/Feed';

//css
import './ChatPage.css';

//controls
import store from '../../data/store';
import { getGroupDetails, getQuestionDetails, getOptionDetails, getMessages } from '../../functions/firebase/get/get';
import { setMessage, addToFeed } from '../../functions/firebase/set/set';
import { deep_value, setWrapperHeight } from '../../functions/general';

module.exports = {
    oninit: vnode => {

        //initilize state from store
        vnode.state = {
            groupTitle: '',
            questionTitle: deep_value(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.questionId}].title`, 'כותרת השאלה'),
            optionTitle: deep_value(store.optionsDetails, `[${vnode.attrs.optionId}].title`, 'כותרת האפשרות'),
            optionDescription: deep_value(store.optionsDetails, `[${vnode.attrs.optionId}].description`, 'תאור האפשרות'),
            messages: [],
            messagesIds: {} // used to check if message is new
        }

        //set last page for login screen
        store.lastPage = '/optionchat/' + vnode.attrs.groupId + '/' + vnode.attrs.questionId + '/' + vnode.attrs.optionId;
        sessionStorage.setItem('lastPage', store.lastPage);

        //update details from DB
        getGroupDetails('on', vnode.attrs.groupId, vnode);
        getQuestionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        getOptionDetails('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, vnode);
        getMessages('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, vnode);
    },

    onupdate: vnode => {
        window.scrollTo(0, document.body.scrollHeight);
        setWrapperHeight('headerContainer', 'chatWrapper')

    },
    onremove: vnode => {
        getGroupDetails('off', vnode.attrs.groupId, vnode);
        getQuestionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        getOptionDetails('off', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId);
        getMessages('off', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, vnode)
    },
    view: vnode => {

        return (
            <div class='page'>
                <Header
                    topic='אופציה'
                    question={vnode.state.questionTitle}
                    title={vnode.state.optionTitle}
                    upLevelUrl={`/question/${vnode.attrs.groupId}/${vnode.attrs.questionId}`}
                />
                <div class='wrapper' id='chatWrapper'>
                    <div class='chatOptionDescription'>
                        הסבר: {vnode.state.optionDescription}
                    </div>
                    {
                        vnode.state.messages.map((message, index) => {
                            return (
                                <div class={message.isNew ? 'message newMessage' : 'message'}>
                                    <span>{message.creatorName}</span>: {message.message}
                                </div>
                            )
                        })
                    }
                </div>

                <form class='chatBox'>
                    <img src='img/icons8-paper-plane-32.png'></img>
                    <textarea
                        class='chatInput'
                        autofocus
                        onkeyup={(e) => { sendMessage(e, vnode) }}
                        value={vnode.state.input} />
                </form>
                <Feed />
            </div>
        )
    }
}

function updateDetials(vnode) {
    //update details

    // vnode.state.questionTitle = deep_value(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.questionId}].title`, 'כותרת השאלה');
    vnode.state.questionTitle = deep_value(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.questionId}].title`, 'כותרת השאלה');
    vnode.state.optionTitle = deep_value(store.optionsDetails, `[${vnode.attrs.optionId}].title`, 'כותרת האפשרות');
    vnode.state.optionDescription = deep_value(store.optionsDetails, `[${vnode.attrs.optionId}].description`, 'תאור האפשרות');
}

function sendMessage(e, vnode) {
    e.preventDefault();
    vnode.state.input = e.target.value;
    //get input

    if (e.key == "Enter") {

        let va = vnode.attrs

        setMessage(
            va.groupId,
            va.questionId,
            va.optionId,
            store.user.uid,
            store.user.displayName || 'אנונימי',
            e.target.value,
            vnode.state.groupName,
            vnode.state.questionTitle,
            vnode.state.optionTitle,
        )
        vnode.state.input = ''
    }

}





