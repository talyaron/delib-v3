import m from 'mithril';
import { get } from 'lodash';

import './ChatPage.css';

import store from '../../data/store';
import { getQuestionDetails, getOptionDetails, getMessages } from '../../functions/firebase/get/get';
import { setMessage } from '../../functions/firebase/set/set';


module.exports = {
    oninit: vnode => {

        //initilize state from store
        vnode.state = {
            questionTitle: get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.questionId}].title`, 'כותרת השאלה'),
            optionTitle: get(store.optionsDetails, `[${vnode.attrs.optionId}].title`, 'כותרת האפשרות'),
            optionDescription: get(store.optionsDetails, `[${vnode.attrs.optionId}].description`, 'תאור האפשרות'),
            messages: []
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
                            return <div class='message'>{message.message}</div>
                        })
                    }
                </div>

                <form class='chatBox'>
                    <img src='img/icons8-paper-plane-32.png'></img>
                    <textarea class='chatInput' autofocus onkeyup={(e) => { sendMessage(e, vnode) }} />
                </form>
            </div>
        )
    }
}

function updateDetials(vnode) {
    //update details
    vnode.state.questionTitle = get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.questionId}].title`, 'כותרת השאלה');
    vnode.state.optionTitle = get(store.optionsDetails, `[${vnode.attrs.optionId}].title`, 'כותרת האפשרות');
    vnode.state.optionDescription = get(store.optionsDetails, `[${vnode.attrs.optionId}].description`, 'תאור האפשרות');
}

function sendMessage(e,vnode) {
    e.preventDefault();
    //get input
    
    if (e.key == "Enter") {
        let va = vnode.attrs
        console.log(va.groupId, va.questionId, va.optionId);
        setMessage(va.groupId, va.questionId, va.optionId, store.user.uid, store.user.displayName || 'אנונימי', e.target.value)
    }
    
}

