import m from 'mithril';
import './Options.css';

//componetns
import Suggests from './Suggests/Suggets'

import { getOptions } from '../../../functions/firebase/get/get';


//functions


module.exports = {
    oninit: vnode => {

        vnode.state = {
            options: []
        }

        let va = vnode.attrs;
        getOptions(va.groupId, va.questionId, va.subQuestionId, va.orderBy, vnode);
    },
    view: (vnode) => {

        return (
            <div class='wrapper' id='optionsWrapper' >
                <div class='questionSection'>
                    <div
                        class='questionSectionTitle questions'
                        style={`color:${vnode.attrs.info.colors.color}; background:${vnode.attrs.info.colors.background}`}
                    >{vnode.attrs.title}</div>                    
                    {switchProcess('suggestions', vnode)}
                    <div class='questionSectionFooter'>
                        <div
                            class='buttons questionSectionAddButton'
                            onclick={() => { addQuestion(vnode, vnode.attrs.info.type) }}
                        >{vnode.attrs.info.add}</div>
                    </div>
                </div>

            </div>
        )
    }
}

function addQuestion(vnode, type) {
    vnode.attrs.parentVnode.state.showModal = { subQuestionId: vnode.attrs.subQuestionId, which: type, isShow: true, title: 'הוסף אפשרות' };
}

function switchProcess(type, vnode) {
    switch (type) {
        case 'suggestions':
            return <Suggests
                groupId={vnode.attrs.groupId}
                questionId={vnode.attrs.questionId}
                subQuestionId={vnode.attrs.subQuestionId}
                options={vnode.state.options}
            />
        case 'votes':
            return null;
        default:
            return null
    }

}