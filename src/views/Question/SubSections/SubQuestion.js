import m from 'mithril';

import SubAnswer from './SubAnswer/SubAnswer';
import './SubQuestion.css';



module.exports = {

    oninit: vnode => {
        vnode.state = { showAnswers: false, subAnswers: [] }


    },
    oncreate: vnode => {
        //hide sub answers...
        vnode.dom.children[1].style.height = '0px';
    },
    onbeforeupdate: vnode => {
        vnode.state.subAnswers = vnode.attrs.subAnswers || []
    },
    onupdate: vnode => {

        console.dir(vnode.state.subAnswers)
    },
    onremove: vnode => {

    },
    view: (vnode) => {
        let showAnswers = vnode.state.showAnswers;

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
                    <div class='subQuestionCardTalk'>שיחות</div>
                </div>
                <div class={showAnswers ? 'subAnswersWrapper showAnswers' : 'subAnswersWrapper hideAnswers'}>
                    <div class='subAnswersWrapper2'>
                        {
                            vnode.state.subAnswers.map((subAnswer, index) => {
                                console.dir(subAnswer)
                                return <SubAnswer text={subAnswer.text} author={subAnswer.author} time={subAnswer.time} />
                            })
                        }
                    </div>
                    <form onsubmit='addAnswer(vnode)' class='addInputForm'>
                        <textarea placeholder='כתבו את תשובתכם כאן' autofocus>

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

