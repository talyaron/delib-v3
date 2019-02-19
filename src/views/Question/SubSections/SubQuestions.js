import m from 'mithril';
import './SubQuestions.css';
import SubQuestion from './SubQuestion';



module.exports = {
    oninit: vnode => {
        vnode.state = {
            subQuestions: [
                { description: 'מה עושים עם זה?', author: 'טל ירון', support: 23 },
                { description: 'כיצד זה יכול לעזור לנו?', author: 'ניסים ביר', support: 45 }
            ]
        }
    },
    view: (vnode) => {
        return (
            <div class='questionSection'>
                <div class='questionSectionTitle questions'> שאלות המשך</div>
                <div class='questionSectionFooter'>
                    {
                        vnode.state.subQuestions.map((subQuestion, index) => {
                            return <SubQuestion
                                description={subQuestion.description}
                                author={subQuestion.author}
                                support={subQuestion.support}
                            />
                        })
                    }
                    <div class='buttons questionSectionAddButton'>הוסף שאלה</div>
                </div>
            </div>
        )
    }
}

