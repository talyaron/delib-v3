import m from 'mithril';
import { deep_value} from '../../functions/general'

import './Question.css';
import Option from './Option/Option';

import store from '../../data/store';

import { getQuestionDetails, getOptions } from '../../functions/firebase/get/get';
import { createOption } from '../../functions/firebase/set/set';


module.exports = {
    oninit: vnode => {

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
            scrollY:false
        }

        store.lastPage = '/question/' + vnode.attrs.groupId + '/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage);

        store.options = [];


        vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, vnode.state.orderBy);
        vnode.state.unsubscribeQuestion = getQuestionDetails(vnode.attrs.groupId, vnode.attrs.id, vnode);
        
        //scroll detection
        
        window.onscroll = function (e) {
           
            if (this.oldScroll < this.scrollY) { vnode.state.scrollY = true; m.redraw() }
            this.oldScroll = this.scrollY;
            
        }

    },
    onbeforeupdate: vnode => {

        vnode.state.title = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.title`, 'כותרת השאלה');
        vnode.state.description = deep_value(store.questions, `${vnode.attrs.groupId}.${vnode.attrs.id}.description`, '');
       
    },
    onupdate: vnode => {
        //get final position


        store.options.forEach(option => {

            // vnode.state.options[option.id] = { x: elementX, y: elementY}

        })
    },
    onremove: vnode => {
        vnode.state.unsubscribeOptions();
        vnode.state.unsubscribeQuestion();
    },
    view: vnode => {
       
        return (
            <div>
                <div class='questionHeadr' onclick={() => { m.route.set('/group/' + vnode.attrs.groupId) }}>
                    <div class='mainHeader'>
                        שאלה: {vnode.state.title}
                    </div>
                 
                </div>
                <div class={vnode.state.scrollY ? 'subHeader hideOnScroll' : 'subHeader'}>{vnode.state.description}</div>
                <div class='wrapper groupsWrapper' style="margin-top:150px">
                    {

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
                </div>

                <div class='footer'>
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



function toggleAddOption(vnode) {
    vnode.state.addOption = !vnode.state.addOption;
}

function orderBy(order, vnode) {
    // getOptions('off', vnode.attrs.groupId, vnode.attrs.id, order);

    vnode.state.unsubscribeOptions();
    vnode.state.unsubscribeOptions = getOptions('on', vnode.attrs.groupId, vnode.attrs.id, order);
    vnode.state.orderBy = order
}
