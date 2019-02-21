
import m from 'mithril';
import './Modal.css';

import { createOption } from '../../../functions/firebase/set/set';

import store from '../../../data/store';

module.exports = {
    oninit: vnode => {
        console.dir(vnode.attrs)

        vnode.state = {
            showModal: vnode.attrs.showModal,
            ParentVnode: vnode.attrs.vnode,
            add: {
                title: '',
                description: ''
            }
        }
    },
    onbeforeupdate: vnode => {
        console.dir(vnode.attrs)

        console.dir(vnode.state)
        vnode.state.showModal = vnode.attrs.showModal;
    },
    view: vnode => {
        let vnp = vnode.state.ParentVnode;
        return (
            <div>
                {
                    (vnode.state.showModal) ?
                        < div class='module' >
                            <div class='moduleBox'>
                                <div class='moduleTitle'>{vnode.attrs.title}</div>
                                <div class='moduleInputs'>
                                    <textarea
                                        class='moduleQuestionTitle'
                                        autofocus='true'
                                        placeholder={vnode.attrs.placeholderTitle}
                                        onkeyup={(e) => { vnode.state.add.title = e.target.value }}
                                    ></textarea>
                                    <textarea
                                        class='moduleQuestionTitle moduleDescription'
                                        placeholder={vnode.attrs.placeholderDescription}
                                        onkeyup={(e) => { vnode.state.add.description = e.target.value }}
                                    ></textarea>
                                </div>
                                <div class='moduleButtons'>
                                    <div class='buttons confirm' onclick={() => {
                                        createOption(vnp.attrs.groupId, vnp.attrs.id, store.user.uid, vnode.state.add.title, vnode.state.add.description);
                                        toggleShowModal('off', vnode);
                                    }}>הוספה</div>
                                    <div class='buttons cancel' onclick={() => { toggleShowModal('off', vnode) }}>ביטול</div>
                                </div>
                            </div>
                        </div >
                        :
                        <div />
                }
            </div>
        )
    }
}


function toggleShowModal(onOff, vnode) {
    if (onOff == 'on') {
        vnode.state.showModal = true;

    } else {

        vnode.state.ParentVnode.state.showModal.isShow = false;
    }
}


