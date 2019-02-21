import m from 'mithril';

import SubAnswer from './SubAnswer/SubAnswer';
import './SubQuestion.css';

import { setSubAnswer } from '../../../functions/firebase/set/set';

import store from '../../../data/store';


module.exports = {

    oninit: vnode => {
        vnode.state = { showAnswers: false, subAnswers: [] }


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
                <div class='card subQuestionCard' onclick={() => toggleSubQuestion(vnode, 182)}>
                    <div class='subQuestionCardCotent'>
                        <div class='subQuestionCardDesc'>{vnode.attrs.description}</div>
                        <div class='subQuestionCardVote optionVote'>
                            <img src='img/icons8-facebook-like-32.png' />
                            <div class='voteCount'>{vnode.attrs.support}</div>
                        </div>
                    </div>
                    <div class='subQuestionCardAuthor'>{vnode.attrs.author}</div>
                    <div class='subQuestionCardTalk'>שיחות: {numberOfSubAnswers}</div>
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

