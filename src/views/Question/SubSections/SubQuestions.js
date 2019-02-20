import m from 'mithril';
import './SubQuestions.css';
import SubQuestion from './SubQuestion';



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
                            console.dir(vnode.attrs.subAnswers[subQuestion.id])
                            return <SubQuestion
                                description={subQuestion.description}
                                author={subQuestion.author}
                                support={subQuestion.support}
                                questionId={subQuestion.id}
                                groupId={vnode.attrs.groupId}
                                questionId={vnode.attrs.questionId}
                                subAnswers={vnode.attrs.subAnswers[subQuestion.id]}
                                key={index}
                            />
                        })
                    }
                    <div class='buttons questionSectionAddButton'>הוסף שאלה</div>

                </div>
            </div>
        )
    }
}

