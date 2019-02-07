import m from 'mithril';

import { deep_value } from '../../functions/general';

import './ChatPage.css';

import store from '../../data/store';
import { getQuestionDetails, getOptionDetails, getMessages } from '../../functions/firebase/get/get';
import { setMessage } from '../../functions/firebase/set/set';


module.exports = {
    oninit: vnode => {

        //initilize state from store
        vnode.state = {
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
        getQuestionDetails('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        getOptionDetails('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId);
        getMessages('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, vnode);
    },
    onbeforeupdate: vnode => {
        updateDetials(vnode);

    },
    onupdate: vnode => {
        window.scrollTo(0,document.body.scrollHeight );
       
    },
    onremove: vnode => {
        getQuestionDetails('off', vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        getOptionDetails('off', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId);
        getMessages('off', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, vnode)
    },
    view: vnode => {
        return (
            <div class='page'>
                <header onclick={() => { m.route.set('/question/' + vnode.attrs.groupId + '/' + vnode.attrs.questionId) }}>
                    <div class='chatOptionQuestion'>
                        שאלה: {vnode.state.questionTitle}
                    </div>
                    <div class='chatOptionHeader'>
                        אפשרות: {vnode.state.optionTitle}
                    </div>
                </header>
                <div class='wrapper'>
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
        console.log(va.groupId, va.questionId, va.optionId);
        setMessage(va.groupId, va.questionId, va.optionId, store.user.uid, store.user.displayName || 'אנונימי', e.target.value)
        vnode.state.input = ''
    }

}





