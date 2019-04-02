import m from 'mithril';
import Sortable from 'sortablejs';

import store from '../../data/store';
import { getQuestionDetails, getSubQuestions } from '../../functions/firebase/get/get';
import { updateQuestion, setSubQuestionsOrder, createSubQuestion } from '../../functions/firebase/set/set';
import { setWrapperHeight } from '../../functions/general';

import './QuestionEdit.css';

import Header from '../Commons/Header/Header';
import SubQuestion from './SubQuestion/SubQuestion';

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
                details: {},
                subQuestions: {}
            },
            editabels: {
                title: false,
                description: false
            },
            subQuestions: [],
            subQuestionsArray: [],
            addSubQuestin: false,
            newSubQuestion: ''
        }


        vnode.state.unsbscribe.details = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.questionId, vnode);
        getSubQuestions(vnode.attrs.groupId, vnode.attrs.questionId, vnode);


    },
    oncreate: vnode => {
        setWrapperHeight('headerContainer', 'questionEditWrapperAll');

        let sortOptions = document.getElementById('sortOptions');

        let sortOptionsObj = Sortable.create(sortOptions, {
            animation: 150,
            onEnd: evt => {

                //set order to DB
                let elements = evt.target.children;
                for (let i = 0; i < elements.length; i++) {
                    setSubQuestionsOrder(vnode.attrs.groupId, vnode.attrs.questionId, elements[i].id, i);
                }


            }
        })
    },
    onbeforeupdate: vnode => {
        // let counter = 0;
        // for (let i in vnode.state.subQuestions) {
        //     vnode.state.subQuestionsArray[counter] = vnode.state.subQuestions[i];
        //     counter++;
        // }
        // console.dir(vnode.state.subQuestionsArray)
    },
    onupdate: vnode => {
        setWrapperHeight('headerContainer', 'questionEditWrapperAll')
    },
    onremove: vnode => {
        vnode.state.unsbscribe.details();
        // vnode.state.unsbscribe.subQuestions();
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
                    <div class='moduleTitle'>מידע כללי</div>
                    <div class='questionIntro'>
                        {!vnode.state.editabels.title ?
                            <div
                                class='questionIntroTitle'
                                onclick={(e) => { e.stopPropagation(); vnode.state.editabels.title = true }}
                            >
                                <div class='subTitleEdit'>כותרת:</div><div> {vnode.state.title}</div>
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
                        {vnode.state.editabels.description ?

                            <div>
                                <textarea
                                    value={vnode.state.description}
                                    class='questionIntroDescription_texterae'
                                    onkeyup={(e) => { updateField('description', e.target.value, vnode) }}
                                />
                                <div
                                    class='buttons questionIntroButton'
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        vnode.state.editabels.description = false
                                        updateQuestion(vnode.attrs.groupId, vnode.attrs.questionId, vnode.state.title, vnode.state.description)
                                    }}
                                >
                                    שמירה
                                 </div>
                            </div>
                            :
                            <div
                                class='questionIntroDescription'
                                onclick={(e) => { e.stopPropagation(); vnode.state.editabels.description = true }}
                            >
                                <div class='subTitleEdit'>הסבר: </div>
                                <div>  {vnode.state.description}</div>
                            </div>
                        }
                    </div>
                    <div class='moduleTitle'>תת-שאלות ומטרות</div>
                    <ul id='sortOptions'>
                        {
                            vnode.state.subQuestions.map((subQuestion, index) => {
                                return <SubQuestion
                                    number={index}
                                    title={subQuestion.title}
                                    id={subQuestion.id}
                                />
                            })
                        }

                    </ul>
                    {
                        vnode.state.addSubQuestin ?
                            <div>
                                <input
                                    type='text'
                                    placeholder='תת שאלה חדשה או תת מטרה חדשה'
                                    class='inputNewSubQuestion'
                                    value={vnode.state.newSubQuestion}
                                    onkeyup={(e) => { vnode.state.newSubQuestion = e.target.value; }}
                                />
                            </div>
                            :
                            <div />
                    }
                    {!vnode.state.addSubQuestin ?
                        <div
                            class='buttons addSubQuestin'
                            onclick={() => { vnode.state.addSubQuestin = true }}
                        >הוספת תת-שאלה או מטרה</div>
                        :
                        <div class='buttonsWrapper'>
                            <div class
                                class='buttons addSubQuestin'
                                onclick={(e) => {
                                    e.stopPropagation();
                                    vnode.state.addSubQuestin = false;
                                    createSubQuestion(
                                        vnode.attrs.groupId,
                                        vnode.attrs.questionId,
                                        vnode.state.newSubQuestion,
                                        vnode.state.subQuestions.length)

                                    vnode.state.subQuestions.push({
                                        creator: store.user.uid,
                                        title: vnode.state.newSubQuestion,
                                        order: vnode.state.subQuestions.length,
                                        id: 'tempIdBeforeUpdate'
                                    })
                                    getSubQuestions(vnode.attrs.groupId, vnode.attrs.questionId, vnode);
                                    vnode.state.newSubQuestion = '';
                                }}
                            >הוספה</div>
                            <div
                                class='buttons addSubQuestin cancel'
                                onclick={(e) => {
                                    e.stopPropagation();
                                    vnode.state.addSubQuestin = false;
                                    vnode.state.newSubQuestion = ''
                                }}
                            >ביטול</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function updateField(field, value, vnode) {
    vnode.state[field] = value;


}



