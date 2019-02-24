import m from 'mithril';
import './SubQuestions.css';
import SubQuestion from './SubQuestion';
import settings from '../../../data/settings';
import store from '../../../data/store';





module.exports = {
    oninit: vnode => {

    },
    view: vnode => {
        return (
            <div class='questionSection'>
                <div class='questionSectionTitle questions'> שאלות המשך</div>
                <div class='questionSectionFooter'>
                    {
                        vnode.attrs.subQuestions.map((subQuestion, index) => {

                            let userRole = false;

                            if (subQuestion.roles.hasOwnProperty(store.user.uid)) {
                                userRole = subQuestion.roles[store.user.uid];

                                if (settings.roles.subQuestions.write[userRole]) {
                                    userRole = true
                                } else {
                                    userRole = false
                                }
                            }


                            return <SubQuestion
                                title={subQuestion.title}
                                description={subQuestion.description}
                                author={subQuestion.author}
                                support={subQuestion.support}
                                questionId={subQuestion.id}
                                groupId={vnode.attrs.groupId}
                                questionId={vnode.attrs.questionId}
                                subQuestionId={subQuestion.id}
                                isEditable={userRole}
                                subAnswers={vnode.attrs.subAnswers[subQuestion.id]}
                                key={index}

                            />
                        })
                    }
                    <div class='buttons questionSectionAddButton' onclick={() => { openNewQuestion(vnode) }}>הוסף שאלה</div>

                </div>
            </div>
        )
    }
}

function openNewQuestion(vnode) {
    vnode.attrs.questionVnode.state.showModal = {
        isShow: true,
        which: 'addSubQuestion',
        title: 'הוספת תת-שאלה '
    }
}

