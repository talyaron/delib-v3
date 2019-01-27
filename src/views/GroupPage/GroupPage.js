import m from 'mithril';
import './GroupPage.css';
import Group from '../Groups/Group/Group';
import store from '../../data/store';

//functions
import { createQuestion } from '../../functions/firebase/set/set';
import { getQuestions } from '../../functions/firebase/get/get';

module.exports = {
    oninit: vnode => {
        store.lastPage = '/group/' + vnode.attrs.id

        vnode.state = {
            add: {
                title: '',
                description: ''
            },
            addQuestion: false,
            questions: [],
            unsubscribe: {}
        }

        getQuestions('on', vnode.attrs.id, vnode);
    },
    onbeforeupdate: vnode => {
        let questionsArray = [];
        for (let i in store.questions[vnode.attrs.id]) {
            questionsArray.push(store.questions[vnode.attrs.id][i]);
        }
        vnode.state.questions = questionsArray;
    },
    onremove: vnode => {
        getQuestions('off', vnode.attrs.id, vnode);
    },
    view: vnode => {
        return (
            <div class='page'>
                <header>דליב - שאלות</header>
                <div class='wrapper groupsWrapper'>
                    {
                        vnode.state.questions.map((question, key) => {
                            return (
                                <Group
                                    title={question.title}
                                    description={question.description}
                                    id={question.id}
                                    key={key}
                                />
                            )
                        })
                    }
                </div>
                <div class='fav' onclick={() => { toggleAddQuestion(vnode) }} >
                    <div>+</div>
                </div>
                {vnode.state.addQuestion ?
                    <div class='module'>
                        <div class='moduleBox'>
                            <div class='moduleTitle'>הוספת שאלה</div>
                            <div class='moduleInputs'>
                                <textarea
                                    class='moduleQuestionTitle'
                                    autofocus='true'
                                    placeholder='כותרת השאלה'
                                    onkeyup={(e) => { vnode.state.add.title = e.target.value }}
                                ></textarea>
                                <textarea
                                    class='moduleQuestionTitle moduleDescription'
                                    placeholder='הסבר על השאלה'
                                    onkeyup={(e) => { vnode.state.add.description = e.target.value }}
                                ></textarea>
                            </div>
                            <div class='moduleButtons'>
                                <div class='buttons confirm' onclick={() => {
                                    vnode.state.addQuestion = !vnode.state.addQuestion;
                                    createQuestion(vnode.attrs.id, store.user.uid, vnode.state.add.title, vnode.state.add.description)
                                }}>הוספה</div>
                                <div class='buttons cancel' onclick={() => { toggleAddQuestion(vnode) }}>ביטול</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div />
                }
            </div >
        )
    }
}


function toggleAddQuestion(vnode) {
    vnode.state.addQuestion = !vnode.state.addQuestion;
}