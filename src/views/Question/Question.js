import m from 'mithril';


import './Question.css';
import Header from '../Commons/Header/Header';
import Option from './Option/Option';
import Message from '../Commons/Message/Message';
import Spinner from '../Commons/Spinner/Spinner';
import SubItems from './SubSections/SubItems';
import Description from './SubSections/Description';
import Goals from './SubSections/Goals';
import Evaluation from './SubSections/Evaluation';
import Modal from '../Commons/Modal/Modal';

import store from '../../data/store';

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
            optionsArr: [],
            add: {
                title: '',
                description: ''
            },
            orderBy: 'top',
            options: {},
            scrollY: false,
            subQuestions: [],
            goals: [],
            values: [],
            subAnswers: {}, //used to set sub answers to each sub question
            subAnswersUnsb: {}, //used to unsubscribe
            showModal: {
                isShow: false,
                which: ''
            }
        }



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

        vnode.state.unsubscribeOptions = getOptions(vnode.attrs.groupId, vnode.attrs.id, vnode.state.orderBy, vnode);
        vnode.state.unsubscribeQuestion = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.id, vnode);
        vnode.state.unsubscribeSubQuestions = getSubItems('subQuestions', vnode.attrs.groupId, vnode.attrs.id, vnode);
        vnode.state.unsubscribeGoals = getSubItems('goals', vnode.attrs.groupId, vnode.attrs.id, vnode);
        vnode.state.unsubscribeValues = getSubItems('values', vnode.attrs.groupId, vnode.attrs.id, vnode);
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

        setWrapperHeight('questionHeadr', 'questionWrapperAll');




    },
    onremove: vnode => {
        vnode.state.unsubscribeOptions();
        vnode.state.unsubscribeQuestion();
        vnode.state.unsubscribeSubQuestions();
        vnode.state.unsubscribeGoals();
        vnode.state.unsubscribeValues();
    },
    view: vnode => {

        return (
            <div>
                <div class='questionHeadr' id='questionHeadr' onclick={() => { m.route.set('/group/' + vnode.attrs.groupId) }}>
                    <Header
                        topic='שאלה'
                        title={vnode.state.title}
                        upLevelUrl={`/group/${vnode.attrs.groupId}/${vnode.attrs.questionId}`}
                    />

                </div>
                <div class='wrapperAll' id='questionWrapperAll'>

                    <div class='wrapper'>
                        <Description
                            title='הסבר על השאלה:'
                            content={vnode.state.description}
                        />
                        <SubItems
                            subItemsType='subQuestions'
                            subItemsTitle='שאלות המשך'
                            addTitle='הוספת תת-שאלה'
                            titleColor='#5c5cdc'
                            mainColor='#9292cc'
                            subItems={vnode.state.subQuestions}
                            subAnswers={vnode.state.subAnswers}
                            groupId={vnode.attrs.groupId}
                            questionId={vnode.attrs.id}
                            questionVnode={vnode}

                        />
                        <SubItems
                            subItemsType='goals'
                            subItemsTitle='מטרות הקבוצה'
                            addTitle='הוספת מטרה'
                            titleColor='#2fde56'
                            mainColor='#3ee290'
                            subItems={vnode.state.goals}
                            subAnswers={vnode.state.subAnswers}
                            groupId={vnode.attrs.groupId}
                            questionId={vnode.attrs.id}
                            questionVnode={vnode}

                        />
                        <SubItems
                            subItemsType='values'
                            subItemsTitle='אילוציי הקבוצה'
                            addTitle='הוספת אילוץ'
                            titleColor='#efa211'
                            mainColor='#ecae39'
                            subItems={vnode.state.values}
                            subAnswers={vnode.state.subAnswers}
                            groupId={vnode.attrs.groupId}
                            questionId={vnode.attrs.id}
                            questionVnode={vnode}

                        />

                    </div>
                    <div class='wrapper groupsWrapper' id='optionsWrapper' >
                        <div class='questionSection'>
                            <div class='questionSectionTitle questions'>הצעות</div>
                            {
                                vnode.state.optionsArr.length == 0 ? <Spinner /> :


                                    vnode.state.optionsArr.map((option, index) => {

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
                                    onclick={() => { addQuestion(vnode) }}
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
                <Modal
                    showModal={vnode.state.showModal.isShow}
                    whichModal={vnode.state.showModal.which}
                    title={vnode.state.showModal.title}
                    placeholderTitle='כותרת'
                    placeholderDescription='הסבר'
                    vnode={vnode}
                />
            </div>
        )
    }
}


function addQuestion(vnode) {
    vnode.state.showModal = { which: 'addOption', isShow: true, title: 'הוסף אפשרות' };
}


function orderBy(order, vnode) {
    // getOptions('off', vnode.attrs.groupId, vnode.attrs.id, order);

    vnode.state.unsubscribeOptions();
    vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, order);
    vnode.state.orderBy = order
}
