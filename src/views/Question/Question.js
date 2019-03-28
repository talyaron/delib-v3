import m from 'mithril';


import './Question.css';
import Header from '../Commons/Header/Header';
import Feed from '../Commons/Feed/Feed';
import Options from './Options/Options';
import Message from '../Commons/Message/Message';
import Spinner from '../Commons/Spinner/Spinner';
import SubItems from './SubSections/SubItems';
import Description from './SubSections/Description';
import Goals from './SubSections/Goals';
import Evaluation from './SubSections/Evaluation';
import Modal from '../Commons/Modal/Modal';

import store from '../../data/store';
import settings from '../../data/settings';

import { getQuestionDetails, getOptions, getSubItems } from '../../functions/firebase/get/get';
import { createOption } from '../../functions/firebase/set/set';
import { deep_value, setWrapperHeight, setWrapperFromFooter } from '../../functions/general';


module.exports = {
    oninit: vnode => {

        //get user before login to page
        store.lastPage = '/question/' + vnode.attrs.groupId + '/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage);
        if (store.user.uid == undefined) {
            m.route.set('/login')
        }

        vnode.state = {
            title: deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.title`, 'כותרת השאלה'),
            addOption: false,
            subItems: {
                options: [],
                subQuestions: [],
                goals: [],
                values: []
            },
            add: {
                title: '',
                description: ''
            },
            orderBy: 'top',
            options: {},
            scrollY: false,
            subAnswers: {}, //used to set sub answers to each sub question
            subAnswersUnsb: {}, //used to unsubscribe
            showModal: {
                isShow: false,
                which: ''
            }
        }


        vnode.state.unsubscribeQuestionDetails = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.id, vnode);

        //  show message only one time
        if (store.messagesShow.hasOwnProperty(vnode.attrs.id)) {

            store.messagesShow[vnode.attrs.id] = false
        } else {

            store.messagesShow[vnode.attrs.id] = true
        }

        //scroll detection

        window.onscroll = function (e) {

            if (this.oldScroll < this.scrollY) { vnode.state.scrollY = true; m.redraw() }
            this.oldScroll = this.scrollY;

        }

    },
    oncreate: vnode => {
        setWrapperHeight('questionHeadr', 'questionWrapperAll')
        setWrapperFromFooter('questionFooter', 'optionsWrapper');

        //subscribe to subItems
        vnode.state.unsubscribeOptions = getOptions(vnode.attrs.groupId, vnode.attrs.id, settings.subItems.options.type, vnode.state.orderBy, vnode);
        vnode.state.unsubscribeQuestion = getOptions(vnode.attrs.groupId, vnode.attrs.id, settings.subItems.subQuestions.type, vnode.state.orderBy, vnode);
        vnode.state.unsubscribeGoals = getOptions(vnode.attrs.groupId, vnode.attrs.id, settings.subItems.goals.type, vnode.state.orderBy, vnode);
        vnode.state.unsubscribeValues = getOptions(vnode.attrs.groupId, vnode.attrs.id, settings.subItems.values.type, vnode.state.orderBy, vnode);
    },
    onbeforeupdate: vnode => {

        vnode.state.title = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.title`, 'כותרת השאלה');
        vnode.state.description = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.description`, '');

        let userRole = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.roles.${store.user.uid}`, false);
        if (!userRole) {
            // the user is not a member in the question, he/she should login, and ask for membership
        }

    },
    onupdate: vnode => {

        setWrapperHeight('headerContainer', 'questionWrapperAll');

    },
    onremove: vnode => {
        vnode.state.unsubscribeQuestionDetails();
        vnode.state.unsubscribeOptions();
        vnode.state.unsubscribeQuestion();
        vnode.state.unsubscribeGoals();
        vnode.state.unsubscribeValues();
    },
    view: vnode => {

        return (
            <div>
                <div class='headerContainer' id='questionHeadr' onclick={() => { m.route.set('/group/' + vnode.attrs.groupId) }}>
                    <Header
                        topic='שאלה'
                        title={vnode.state.title}
                        upLevelUrl={`/group/${vnode.attrs.groupId}`}
                    />

                </div>
                <div class='wrapperAll' id='questionWrapperAll'>

                    <div class='wrapper'>
                        <Description
                            title='הסבר על השאלה:'
                            content={vnode.state.description}
                            groupId={vnode.attrs.groupId}
                            questionId={vnode.attrs.id}
                            creatorId={vnode.state.creatorId}
                        />
                    </div>
                    <Options
                        groupId={vnode.attrs.groupId}
                        questionId={vnode.attrs.id}
                        subItems={vnode.state.subItems.subQuestions}
                        parentVnode={vnode}
                        info={settings.subItems.subQuestions}
                    />
                    <Options
                        groupId={vnode.attrs.groupId}
                        questionId={vnode.attrs.id}
                        subItems={vnode.state.subItems.values}
                        parentVnode={vnode}
                        info={settings.subItems.values}
                    />
                    <Options
                        groupId={vnode.attrs.groupId}
                        questionId={vnode.attrs.id}
                        subItems={vnode.state.subItems.goals}
                        parentVnode={vnode}
                        info={settings.subItems.goals}
                    />
                    <Options
                        groupId={vnode.attrs.groupId}
                        questionId={vnode.attrs.id}
                        subItems={vnode.state.subItems.options}
                        parentVnode={vnode}
                        info={settings.subItems.options}
                    />

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
                {
                    vnode.state.title === 'כותרת השאלה' ?
                        <Spinner />
                        :
                        <div />
                }
                <Modal
                    showModal={vnode.state.showModal.isShow}
                    whichModal={vnode.state.showModal.which}
                    title={vnode.state.showModal.title}
                    placeholderTitle='כותרת'
                    placeholderDescription='הסבר'
                    vnode={vnode}
                />
                <Feed />
            </div>
        )
    }
}





function orderBy(order, vnode) {
    // getOptions('off', vnode.attrs.groupId, vnode.attrs.id, order);

    vnode.state.unsubscribeOptions();
    vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, order);
    vnode.state.orderBy = order
}
