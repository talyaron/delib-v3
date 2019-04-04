//core
import m from 'mithril';

//Components
import Header from '../Commons/Header/Header';
import Feed from '../Commons/Feed/Feed';

//css
import './ChatPage.css';

//controls
import store from '../../data/store';
import { getQuestionDetails, getOptionDetails, getMessages } from '../../functions/firebase/get/get';
import { setMessage, addToFeed } from '../../functions/firebase/set/set';
import { deep_value, setWrapperHeight } from '../../functions/general';

//Data
import DB from '../../functions/firebase/config';

module.exports = {
    oninit: vnode => {

        vnode.state = {
            groupTitle: '',
            questionTitle: '',
            option: { title: '' },
            optionTitle: '',
            optionDescription: '',
            messages: [],
            messagesIds: {} // used to check if message is new
        }

        //set last page for login screen
        store.lastPage = `/optionchat/${vnode.attrs.groupId}/${vnode.attrs.questionId}/${vnode.attrs.subQuestionId}/${vnode.attrs.optionId}`;
        sessionStorage.setItem('lastPage', store.lastPage);

        //update details from DB

        vnode.state.unsbOptionDetails = getOptionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.subQuestionId, vnode.attrs.optionId, vnode);
        vnode.state.unsbGetMessages = getMessages(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.subQuestionId, vnode.attrs.optionId, vnode);


    },

    onupdate: vnode => {




        window.scrollTo(0, document.body.scrollHeight);
        setWrapperHeight('headerContainer', 'chatWrapper')

        //check if chat was changed (usualy by feed)
        if (vnode.attrs.optionId != vnode.state.previuos) {

            vnode.state.unsbOptionDetails();
            vnode.state.unsbGetMessages();


            vnode.state.unsbOptionDetails = getOptionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.subQuestionId, vnode.attrs.optionId, vnode);
            vnode.state.unsbGetMessages = getMessages(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.subQuestionId, vnode.attrs.optionId, vnode);

        }
        vnode.state.previuos = vnode.attrs.optionId

    },
    onremove: vnode => {

        // getQuestionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        vnode.state.unsbGetMessages();


    },
    view: vnode => {

        return (
            <div class='page'>
                <Header
                    groupId={vnode.attrs.groupId}
                    questionId={vnode.attrs.questionId}
                    subQuestionId={vnode.attrs.subQuestionId}
                    optionId={vnode.attrs.optionId}
                    topic='אופציה'
                    title={vnode.state.option.title}
                    upLevelUrl={`/question/${vnode.attrs.groupId}/${vnode.attrs.questionId}`}
                    entityId={vnode.attrs.optionId}
                />
                <div class='chatWrapper' id='chatWrapper'>
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
            va.subQuestionId,
            va.optionId,
            store.user.uid,
            store.user.displayName || 'אנונימי',
            e.target.value,
            vnode.state.groupTitle,
            vnode.state.questionTitle,
            vnode.state.optionTitle,
        )
        vnode.state.input = ''
    }

}





