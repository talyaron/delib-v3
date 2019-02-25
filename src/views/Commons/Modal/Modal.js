
import m from 'mithril';
import './Modal.css';

import { createOption, createSubItem } from '../../../functions/firebase/set/set';

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
                                        setNewInfo(vnp, vnode)
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


function setNewInfo(vnp, vnode) {
    switch (vnp.state.showModal.which) {
        case 'addOption':
            createOption(vnp.attrs.groupId, vnp.attrs.id, store.user.uid, vnode.state.add.title, vnode.state.add.description);
            break;
        case 'subQuestions':
            console.log('addSubQuestion');
            createSubItem('subQuestions', vnp.attrs.groupId, vnp.attrs.id, store.user.uid, store.user.displayName || 'אנונמי/ת', vnode.state.add.title, vnode.state.add.description)
            break;
        case 'goals':
            createSubItem('goals', vnp.attrs.groupId, vnp.attrs.id, store.user.uid, store.user.displayName || 'אנונמי/ת', vnode.state.add.title, vnode.state.add.description)
            break;
        case 'values':
            createSubItem('values', vnp.attrs.groupId, vnp.attrs.id, store.user.uid, store.user.displayName || 'אנונמי/ת', vnode.state.add.title, vnode.state.add.description)
            break;
        default:
            console.log('couldnt find such case:', vnp.state.showModal.which)
    }
    vnp.state.showModal.isShow = false;
}

function toggleShowModal(onOff, vnode) {
    if (onOff == 'on') {
        vnode.state.showModal = true;

    } else {

        vnode.state.ParentVnode.state.showModal.isShow = false;
    }
}



