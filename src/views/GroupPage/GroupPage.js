import m from 'mithril';

import { deep_value, setWrapperHeight } from '../../functions/general';
import store from '../../data/store';

import './GroupPage.css';
import Group from '../Groups/Group/Group';
import Header from '../Commons/Header/Header';
import Feed from '../Commons/Feed/Feed';


//functions
import { createQuestion } from '../../functions/firebase/set/set';
import { getQuestions, getGroupDetails } from '../../functions/firebase/get/get';

module.exports = {
    oninit: vnode => {
        store.lastPage = '/group/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage)

        vnode.state = {
            add: {
                title: '',
                description: ''
            },
            addQuestion: false,
            questions: [],
            unsubscribe: {},
            groupName: deep_value(store.groups, '[' + vnode.attrs.id + '].title', 'שם הקבוצה')
        }

        getQuestions('on', vnode.attrs.id, vnode);
        getGroupDetails('on', vnode.attrs.id, vnode);
    },
    oncreate: vnode => {
        setWrapperHeight('headerContainer', 'groupWrapper');
    },
    onbeforeupdate: vnode => {

        //update name of group
        vnode.state.groupName = deep_value(store.groups, '[' + vnode.attrs.id + '].title', 'שם הקבוצה');
        document.title = `דליב - ${vnode.state.groupName}`

        //update array of questions
        let questionsArray = [];
        for (let i in store.questions[vnode.attrs.id]) {
            questionsArray.push(store.questions[vnode.attrs.id][i]);
        }
        vnode.state.questions = questionsArray;
    },
    onupdate: vnode => {
        setWrapperHeight('headerContainer', 'groupWrapper');
    },
    onremove: vnode => {
        getQuestions('off', vnode.attrs.id, vnode);
        getGroupDetails('off', vnode.attrs.id, vnode);
    },
    view: vnode => {
        return (
            <div class='page'>
                <Header
                    upLevelUrl='/groups'
                    topic='קבוצה'
                    title={vnode.state.groupName} />
                <div class='wrapper groupsWrapper' id='groupWrapper'>
                    {
                        vnode.state.questions.map((question, key) => {
                            return (
                                <Group
                                    route={'/question/' + vnode.attrs.id + '/'}
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
                {
                    vnode.state.addQuestion ?
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
                <Feed />
            </div >

        )
    }
}


function toggleAddQuestion(vnode) {
    vnode.state.addQuestion = !vnode.state.addQuestion;
}