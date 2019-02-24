import m from 'mithril';

import SubAnswer from './SubAnswer/SubAnswer';
import './SubQuestion.css';

import { setSubAnswer, updateSubQuestion } from '../../../functions/firebase/set/set';

import store from '../../../data/store';



module.exports = {

    oninit: vnode => {
        vnode.state = {
            showAnswers: false,
            subAnswers: [],
            subQuestionEdit: false
        }




    },
    oncreate: vnode => {
        //hide sub answers...
        vnode.dom.children[1].style.height = '0px';
    },
    onbeforeupdate: vnode => {
        if (vnode.attrs.subAnswers) {
            vnode.state.subAnswers = [];
            for (let i = 0; i < vnode.attrs.subAnswers.length; i++) {
                vnode.state.subAnswers.unshift(vnode.attrs.subAnswers[i])
            }
        }

    },
    onupdate: vnode => {

        //roll down the sub Messages window
        document.getElementById('subAnswers' + vnode.attrs.subQuestionId).scrollTo(0, document.body.scrollHeight);

    },
    onremove: vnode => {

    },
    view: (vnode) => {
        let showAnswers = vnode.state.showAnswers;
        let numberOfSubAnswers = vnode.state.subAnswers.length;
        return (
            <div>
                <div class='card subQuestionCard' >
                    <div class='subQuestionCardCotent'>

                        {vnode.state.subQuestionEdit ?
                            <form class='editSubQuestion'>
                                <input type='text' value={vnode.attrs.title} id={'title' + vnode.attrs.subQuestionId} />
                                <textarea value={vnode.attrs.description} id={'description' + vnode.attrs.subQuestionId} />
                            </form>
                            :
                            <div>
                                <div class='subQuestionCardDesc'>{vnode.attrs.title}</div>
                                <div class='subQuestionCardDesc'>{vnode.attrs.description}</div>
                            </div>
                        }

                        <div class='subQuestionCardVote optionVote'>
                            <img src='img/icons8-facebook-like-32.png' />
                            <div class='voteCount'>{vnode.attrs.support}</div>
                        </div>
                    </div>
                    <div class='subQuestionCardMore'>
                        <div class='subQuestionCardAuthor'>{vnode.attrs.author}</div>
                        <div class='subQuestionCardTalk' onclick={() => toggleSubQuestion(vnode, 182)}><div class='iconBackground'><img src='img/icons8-chat24.png' /></div> {numberOfSubAnswers}</div>
                        <div class='subQuestionCardEdit'>
                            {
                                vnode.attrs.isEditable ?
                                    <div class='iconBackground' onclick={() => { editSubQuestion(vnode) }}><img src='img/icons8-edit.svg' /></div>
                                    :
                                    <div />
                            }
                        </div>
                    </div>
                </div>
                <div class={showAnswers ? 'subAnswersWrapper showAnswers' : 'subAnswersWrapper hideAnswers'}>
                    <div class='subAnswersWrapper2' id={'subAnswers' + vnode.attrs.subQuestionId}>
                        {
                            vnode.state.subAnswers.map((subAnswer, index) => {
                                return <SubAnswer message={subAnswer.message} author={subAnswer.author} time={subAnswer.time} />
                            })
                        }
                    </div>
                    <form onsubmit={() => addAnswer(event, vnode)} class='addInputForm'>
                        <textarea placeholder='כתבו את תשובתכם כאן' autofocus onkeyup={() => addAnswer(event, vnode)} >

                        </textarea>
                    </form>
                </div>
            </div>
        )
    }
}

function toggleSubQuestion(vnode, height) {
    vnode.state.showAnswers = !vnode.state.showAnswers;

    if (vnode.state.showAnswers) {
        vnode.dom.children[1].style.height = height + 'px';
    } else {
        vnode.dom.children[1].style.height = '0px';
    }
}

function addAnswer(event, vnode) {

    if (event.key == "Enter") {

        let va = vnode.attrs;
        let userName = '';

        if (store.user.isAnonymous || store.user.displayName == null) {
            userName = 'אנונימי/ת'
        } else {
            userName = store.user.displayName
        }


        setSubAnswer(va.groupId, va.questionId, va.subQuestionId, store.user.uid, userName, event.target.value)
        event.target.value = '';
    }
}

function editSubQuestion(vnode) {

    vnode.state.subQuestionEdit = !vnode.state.subQuestionEdit;

    if (!vnode.state.subQuestionEdit) {

        let va = vnode.attrs;

        let title = document.getElementById('title' + vnode.attrs.subQuestionId).value;
        let description = document.getElementById('description' + vnode.attrs.subQuestionId).value
        console.log('update data base', title, description)
        updateSubQuestion(va.groupId, va.questionId, va.subQuestionId, title, description)
    }

}

