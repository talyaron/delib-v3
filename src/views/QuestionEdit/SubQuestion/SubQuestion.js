
import m from 'mithril';
import './SubQuestion.css'

module.exports = {
    oninit: vnode => {

    },
    view: vnode => {

        return (
            <li class='optionEditBox draggable' key={vnode.attrs.number} id={vnode.attrs.id}>
                <div class='optionEditDragable'>
                    {vnode.attrs.number}
                </div>
                <div class='optionEditContent'>
                    <div class='optionEditContentText'>
                        {vnode.attrs.title}
                    </div>
                    <div class='optionEditContentSettings'>
                        <div class='optionEditType'></div>
                        <div class='optionEditShow'></div>
                    </div>
                </div>
            </li>
        )
    }
}