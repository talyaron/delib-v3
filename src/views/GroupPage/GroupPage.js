import m from 'mithril';
import './GroupPage.css';
import store from '../../data/store';

//functions
import { createQuestion } from '../../functions/firebase/set/set';

module.exports = {
    oninit: vnode => {
        store.lastPage = '/group/' + vnode.attrs.id

        vnode.state = {
            add: {
                title: '',
                description: ''
            },
            addQuestion: false
        }
    },
    view: vnode => {
        return (
            <div class='page'>
                <div>Group {vnode.attrs.id} page</div>
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