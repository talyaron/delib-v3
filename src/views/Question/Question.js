import m from 'mithril';
import { get } from 'lodash';
import FLIP from '../../functions/FLIP';
import './Question.css';
import Option from './Option/Option';

import store from '../../data/store';

import { getQuestionDetails, getOptions } from '../../functions/firebase/get/get';
import { createOption } from '../../functions/firebase/set/set';

module.exports = {
    oninit: vnode => {

        vnode.state = {
            title: get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].title`, 'כותרת השאלה'),
            questionUnsubscribe: {},
            addOption: false,
            add: {
                title: '',
                description: ''
            },
            orderBy: 'new'
        }

        store.lastPage = '/question/' + vnode.attrs.groupId + '/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage);

        store.options = [];
        getOptions('on', vnode.attrs.groupId, vnode.attrs.id, vnode.state.orderBy);

        getQuestionDetails('on', vnode.attrs.groupId, vnode.attrs.id, vnode);

    },
    onbeforeupdate: vnode => {

        vnode.state.title = get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].title`, 'כותרת השאלה');
        vnode.state.description = get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].description`, '');
    },
    onupdate: vnode => {

    },
    onremove: vnode => {
        getQuestionDetails('off', vnode.attrs.groupId, vnode.attrs.id, vnode);
        getOptions('off', vnode.attrs.groupId, vnode.attrs.id);
    },
    view: vnode => {
        return (
            <div>
                <div class='questionHeadr' onclick={() => { m.route.set('/group/' + vnode.attrs.groupId) }}>
                    <div class='mainHeader'>
                        שאלה: {vnode.state.title}
                    </div>
                    <div class='subHeader'>{vnode.state.description}</div>
                </div>
                {
                    m('div', { class: 'wrapper groupsWrapper', style: "margin-top:150px" },
                        m(FLIP, {
                            enter: (vnodeChild, flip) => {
                                console.log('enter()', vnodeChild, flip)
                                var anim = [
                                    { transform: 'translate3d(0,-100%,0)', opacity: 0 },
                                    { transform: 'none', opacity: 1 },
                                ]

                                var waapi = vnodeChild.dom.animate(anim, {
                                    duration: 1000,
                                })

                                waapi.onfinish = (e) => {
                                    console.log('finished enter()')
                                }
                            },

                            move: (vnodeChild, flip) => {
                                console.log('move()', vnodeChild, flip)
                                let flipBounding = flip.boundingClients[vnodeChild.key],
                                    diff = flipBounding.deltaY,
                                    anim = [
                                        { transform: 'translate3d(0,' + diff + 'px,0)', opacity: 0 },
                                        { transform: 'translate3d(0,0,0)', opacity: 1 },
                                    ]

                                let waapi = vnodeChild.dom.animate(anim, {
                                    duration: 1000,
                                })

                                waapi.onfinish = (e) => {
                                    console.log('finished move()')
                                }
                            },

                            exit: (vnodeChild, flip) => {
                                console.log('exit()', vnodeChild, flip)
                                let anim = [
                                    { transform: 'none', opacity: 1 },
                                    { transform: 'translate3d(25%,100%,0)', opacity: 0 },
                                ]
                                let waapi = vnodeChild.dom.animate(anim, {
                                    duration: 3000,
                                })

                                return new Promise((resolve) => {
                                    waapi.onfinish = function (e) {
                                        console.log('finished exit()')
                                        resolve()
                                    }
                                })
                            },
                        },
                            store.options.map(listItem)
                            // store.options.map((option, index) => {
                            //     return <Option
                            //         groupId={vnode.attrs.groupId}
                            //         questionId={vnode.attrs.id}
                            //         optionId={option.id}
                            //         title={option.title} description={option.description}
                            //         consensusPrecentage={option.consensusPrecentage}
                            //         key={index}
                            //     />
                            // })
                        )
                    )
                }
                <div class='footer'>
                    <div
                        class={vnode.state.orderBy == 'new' ? 'footerButton footerButtonSelected' : 'footerButton'}
                        onclick={() => { orderBy('new', vnode) }}
                    >חדש</div>
                    <div
                        class={vnode.state.orderBy == 'top' ? 'footerButton footerButtonSelected' : 'footerButton'}
                        onclick={() => { orderBy('top', vnode) }}
                    >Top</div>
                    <div class='footerButton'>שיחות</div>
                </div>
                <div class='fav' onclick={() => { toggleAddOption(vnode) }} >
                    <div>+</div>
                </div>
                {vnode.state.addOption ?
                    <div class='module'>
                        <div class='moduleBox'>
                            <div class='moduleTitle'>הוספת אפשרות</div>
                            <div class='moduleInputs'>
                                <textarea
                                    class='moduleQuestionTitle'
                                    autofocus='true'
                                    placeholder='כותרת האפשרות'
                                    onkeyup={(e) => { vnode.state.add.title = e.target.value }}
                                ></textarea>
                                <textarea
                                    class='moduleQuestionTitle moduleDescription'
                                    placeholder='הסבר על האפשרות'
                                    onkeyup={(e) => { vnode.state.add.description = e.target.value }}
                                ></textarea>
                            </div>
                            <div class='moduleButtons'>
                                <div class='buttons confirm' onclick={() => {
                                    toggleAddOption(vnode);
                                    createOption(vnode.attrs.groupId, vnode.attrs.id, store.user.uid, vnode.state.add.title, vnode.state.add.description)
                                }}>הוספה</div>
                                <div class='buttons cancel' onclick={() => { toggleAddOption(vnode) }}>ביטול</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div />
                }
            </div>
        )
    }
}

function listItem(dataItem) {
    console.log(listItem)
    return m('div', { key: dataItem }, dataItem)
}

function toggleAddOption(vnode) {
    vnode.state.addOption = !vnode.state.addOption;
}

function orderBy(order, vnode) {
    getOptions('off', vnode.attrs.groupId, vnode.attrs.id, order);
    getOptions('on', vnode.attrs.groupId, vnode.attrs.id, order);
    vnode.state.orderBy = order
}
