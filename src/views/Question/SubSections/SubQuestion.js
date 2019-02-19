import m from 'mithril';

import SubAnswer from './SubAnswer/SubAnswer';
import './SubQuestion.css';



module.exports = {

    oninit: vnode => {
        vnode.state = { showAnswers: false }
    },
    oncreate: vnode => {
        //hide sub answers...
        vnode.dom.children[1].style.height = '0px';
    },
    view: (vnode) => {
        let showAnswers = vnode.state.showAnswers
        return (
            <div>
                <div class='card subQuestionCard' onclick={() => toggleSubQuestion(vnode, 120)}>
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
                <div class={showAnswers ? 'subAnswersWrapper showAnswers' : 'subAnswersWrapper hideAnswers'}>
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
                    <SubAnswer text='תשובה כל שהיא' author='יציק שמולי' time='12:34' />
                    <form onsubmit='addAnswer(vnode)' class='addInputForm'>
                        <textarea placeholder='כתבו את תשובתכם כאן'>

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
        vnode.dom.children[1].style.height = height + '0px';
    } else {
        vnode.dom.children[1].style.height = '0px';
    }
}

