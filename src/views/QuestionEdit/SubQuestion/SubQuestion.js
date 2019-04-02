
import m from 'mithril';
import './SubQuestion.css'

module.exports = {
    oninit: vnode => {

    },
    view: vnode => {

        return (
            <div class='optionEditBox'>
                <div class='optionEditDragable'>
                </div>
                <div class='optionEditContent'>
                    <div class='optionEditContentText'></div>
                    <div class='optionEditContentSettings'>
                        <div class='optionEditType'></div>
                        <div class='optionEditShow'></div>
                    </div>
                </div>
            </div>
        )
    }
}