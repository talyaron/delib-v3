import m from 'mithril';


import './Question.css';
import Option from './Option/Option';
import Message from '../Commons/Message/Message';
import Spinner from '../Commons/Spinner/Spinner';
import SubQuestions from './SubSections/SubQuestions';
import Description from './SubSections/Description';
import Goals from './SubSections/Goals';
import Evaluation from './SubSections/Evaluation';

import store from '../../data/store';

import { getQuestionDetails, getOptions } from '../../functions/firebase/get/get';
import { createOption } from '../../functions/firebase/set/set';
import { deep_value, setWrapperHeight, setWrapperFromFooter } from '../../functions/general';


module.exports = {
    oninit: vnode => {
        store.lastPage = '/question/' + vnode.attrs.groupId + '/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage);

        vnode.state = {
            title: deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.title`, 'כותרת השאלה'),
            questionUnsubscribe: {},
            addOption: false,
            add: {
                title: '',
                description: ''
            },
            orderBy: 'top',
            options: {},
            scrollY: false
        }



        store.options = [];

        // help show message only one time
        if (store.messagesShow.hasOwnProperty(vnode.attrs.id)) {
            console.log('shown in the past')
            store.messagesShow[vnode.attrs.id] = false
        } else {
            console.log('not shown in the past')
            store.messagesShow[vnode.attrs.id] = true
        }

        vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, vnode.state.orderBy);
        vnode.state.unsubscribeQuestion = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.id, vnode);

        //scroll detection

        window.onscroll = function (e) {

            if (this.oldScroll < this.scrollY) { vnode.state.scrollY = true; m.redraw() }
            this.oldScroll = this.scrollY;

        }

    },
    oncreate: vnode => {
        setWrapperHeight('questionHeadr', 'questionWrapperAll')
        setWrapperFromFooter('questionFooter', 'optionsWrapper');
    },
    onbeforeupdate: vnode => {

        vnode.state.title = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.title`, 'כותרת השאלה');
        vnode.state.description = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.description`, '');

    },
    onupdate: vnode => {
        //get final position
        setWrapperHeight('questionHeadr', 'questionWrapperAll')


    },
    onremove: vnode => {
        vnode.state.unsubscribeOptions();
        vnode.state.unsubscribeQuestion();
    },
    view: vnode => {

        return (
            <div>
                <div class='questionHeadr' id='questionHeadr' onclick={() => { m.route.set('/group/' + vnode.attrs.groupId) }}>
                    <div class='mainHeader'>
                        שאלה: {vnode.state.title}
                    </div>
                </div>
                <div class='wrapperAll' id='questionWrapperAll'>

                    <div class='wrapper'>
                        <Description
                            title='הסבר על השאלה:'
                            content={vnode.state.description}
                        />
                        <SubQuestions />
                        <Goals />
                        <Evaluation />
                    </div>
                    <div class='wrapper groupsWrapper' id='optionsWrapper' >
                        <div class='questionSection'>
                            <div class='questionSectionTitle questions'>הצעות</div>



                            {store.options.length == 0 ? <Spinner /> :

                                store.options.map((option, index) => {
                                    return <Option
                                        groupId={vnode.attrs.groupId}
                                        questionId={vnode.attrs.id}
                                        optionId={option.id}
                                        title={option.title} description={option.description}
                                        consensusPrecentage={option.consensusPrecentage}
                                        key={index}
                                    />
                                })
                            }
                            <div class='questionSectionFooter'>
                                <div
                                    class='buttons questionSectionAddButton'
                                    onclick={() => { toggleAddOption('on', vnode) }}
                                >הוסף הצעה</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class='footer' id='questionFooter'>
                    <div
                        class={vnode.state.orderBy == 'new' ? 'footerButton footerButtonSelected' : 'footerButton'}
                        onclick={() => {

                            orderBy('new', vnode)
                        }}
                    >חדש</div>
                    <div
                        class={vnode.state.orderBy == 'top' ? 'footerButton footerButtonSelected' : 'footerButton'}
                        onclick={() => {

                            orderBy('top', vnode)
                        }}
                    >Top</div>
                    <div class='footerButton'>שיחות</div>
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
                                    toggleAddOption('off', vnode);
                                    createOption(vnode.attrs.groupId, vnode.attrs.id, store.user.uid, vnode.state.add.title, vnode.state.add.description)
                                }}>הוספה</div>
                                <div class='buttons cancel' onclick={() => { toggleAddOption('off', vnode) }}>ביטול</div>
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



function toggleAddOption(onOff, vnode) {
    if (onOff == 'on') {
        vnode.state.addOption = true;
    } else {
        vnode.state.addOption = false;
    }
}

function orderBy(order, vnode) {
    // getOptions('off', vnode.attrs.groupId, vnode.attrs.id, order);

    vnode.state.unsubscribeOptions();
    vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, order);
    vnode.state.orderBy = order
}
