import m from 'mithril';
import './SubQuestion.css';



module.exports = {

    view: (vnode) => {
        return (
            <div class='card subQuestionCard'>
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
        )
    }
}

