import m from 'mithril';

import SubAnswer from './SubAnswer/SubAnswer';
import './SubQuestion.css';



module.exports = {

    oninit: vnode => {
        vnode.state = { showAnswers: false }
    },
    view: (vnode) => {
        let showAnswers = vnode.state.showAnswers
        return (
            <div>
                <div class='card subQuestionCard' onclick={() => toggleSubQuestion(vnode)}>
                    <div class='subQuestionCardCotent'>
                        <div class='subQuestionCardDesc'>{vnode.attrs.description}</div>
                        <div class='subQuestionCardVote optionVote'>
                            <img src='img/icons8-facebook-like-32.png' />
                            <div class='voteCount'>{vnode.attrs.support}</div>
                        </div>
                    </div>
                    <div class='subQuestionCardAuthor'>{vnode.attrs.author}</div>
                    <div class='subQuestionCardTalk'>שיחות</div>
                </div>
                <div class={showAnswers ? 'subAnswersWrapper' : 'subAnswersWrapper'}>
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                </div>
            </div>
        )
    }
}

function toggleSubQuestion(vnode) {
    vnode.state.showAnswers = !vnode.state.showAnswers;
    console.log(vnode.dom.children[1].clientHeight);
    if (vnode.state.showAnswers) {
        vnode.dom.children[1].style.height = '120px';
    } else {
        vnode.dom.children[1].style.height = '0px';
    }
}

