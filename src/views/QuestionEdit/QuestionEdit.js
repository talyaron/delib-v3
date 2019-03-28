import m from 'mithril';

import store from '../../data/store';
import { getQuestionDetails } from '../../functions/firebase/get/get';
import { updateQuestion } from '../../functions/firebase/set/set';
import { setWrapperHeight } from '../../functions/general';

import './QuestionEdit.css';

import Header from '../Commons/Header/Header';

module.exports = {
    oninit: vnode => {
        //get user before login to page
        store.lastPage = '/questionEdit/' + vnode.attrs.groupId + '/' + vnode.attrs.questionId;
        sessionStorage.setItem('lastPage', store.lastPage);
        if (store.user.uid == undefined) {
            m.route.set('/login')
        }

        vnode.state = {
            title: 'כותרת שאלה',
            description: 'תאור שאלה',
            unsbscribe: {
                details: {}
            },
            editabels: {
                title: false,
                description: false
            }
        }


        vnode.state.unsbscribe.details = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode);



    },
    oncreate: vnode => {
        setWrapperHeight('headerContainer', 'questionEditWrapperAll');
    },
    onupdate: vnode => {
        setWrapperHeight('headerContainer', 'questionEditWrapperAll')
    },
    onremove: vnode => {
        vnode.state.unsbscribe.details();
    },
    view: vnode => {

        return (
            <div>
                <Header
                    title={vnode.state.title}
                    topic='עריכת שאלה'
                    description={vnode.state.description}
                    upLevelUrl={`/question/${vnode.attrs.groupId}/${vnode.attrs.questionId}`}
                />
                <div class='wrapperAll' id='questionEditWrapperAll'>
                    <div class='questionIntro'>
                        {!vnode.state.editabels.title ?
                            <div
                                class='questionIntroTitle'
                                onclick={(e) => { e.stopPropagation(); vnode.state.editabels.title = true }}
                            >
                                {vnode.state.title}
                            </div>
                            :
                            <div>
                                <input
                                    type='text'
                                    value={vnode.state.title}
                                    class='questionIntroTitle'
                                    onkeyup={(e) => { updateField('title', e.target.value, vnode) }}
                                />
                                <div
                                    class='buttons questionIntroButton'
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        vnode.state.editabels.title = false
                                        updateQuestion(vnode.attrs.groupId, vnode.attrs.questionId, vnode.state.title, vnode.state.description)
                                    }}
                                >
                                    שמירה
                                 </div>
                            </div>
                        }
                        <div class='questionIntroDescription'>
                            {vnode.state.description}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function updateField(field, value, vnode) {
    vnode.state[field] = value;

}



