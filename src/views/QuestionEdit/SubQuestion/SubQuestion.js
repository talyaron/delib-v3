
import m from 'mithril';
import './SubQuestion.css'

import { updateSubQuestion } from '../../../functions/firebase/set/set';

module.exports = {
    oninit: vnode => {
        vnode.state = {
            isEdit: true,
            title: vnode.attrs.title
        }
    },
    view: vnode => {
        let va = vnode.attrs, vs = vnode.state
        return (
            <div class='optionEditBox draggable' key={vnode.attrs.number} id={vnode.attrs.id}>

                <div class='optionEditContent'>
                    <div class='optionEditContentText'>
                        {vnode.state.isEdit ?
                            <div>כותרת: {vnode.state.title}</div>
                            :
                            <input type='text' value={vnode.state.title} onkeyup={(e) => { vnode.state.title = e.target.value }} />
                        }
                    </div>
                    <div class='optionEditContentSettings'>
                        <div class='optionEditEdit'>
                            <div class='buttons optionEditButton' onclick={() => {
                                vnode.state.isEdit = !vnode.state.isEdit;
                                if (vnode.state.isEdit) { updateSubQuestion(va.groupId, va.questionId, va.subQuestionId, vs.title) }
                            }}>
                                {
                                    vnode.state.isEdit ?
                                        'עריכה'
                                        :
                                        'שמירה'
                                }
                            </div>
                        </div>
                        <div class='optionEditType'></div>
                        <div class='optionEditShow'></div>
                    </div>
                </div>
            </div>
        )
    }
}