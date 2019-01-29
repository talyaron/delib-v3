import m from 'mithril';
import { get } from 'lodash';
import './Question.css';
import Option from './Option/Option';

import store from '../../data/store';

import { getQuestionDetails, getOptions } from '../../functions/firebase/get/get';
import { createOption } from '../../functions/firebase/set/set';

module.exports = {
    oninit: vnode => {

        store.lastPage = '/question/' + vnode.attrs.groupId + '/' + vnode.attrs.id;
        sessionStorage.setItem('lastPage', store.lastPage);

        store.options = [];
        getOptions('on', vnode.attrs.groupId, vnode.attrs.id);

        getQuestionDetails('on', vnode.attrs.groupId, vnode.attrs.id, vnode);
        vnode.state = {
            title: get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].title`, 'כותרת השאלה'),
            questionUnsubscribe: {},
            addOption: false,
            add: {
                title: '',
                description: ''
            }
        }
    },
    onbeforeupdate: vnode => {
        vnode.state.title = get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].title`, 'כותרת השאלה');
        vnode.state.description = get(store.questions, `[${vnode.attrs.groupId}][${vnode.attrs.id}].description`, '');
    },
    onremove: vnode => {
        getQuestionDetails('off', vnode.attrs.groupId, vnode.attrs.id, vnode);
        getOptions('off', vnode.attrs.groupId, vnode.attrs.id);
    },
    view: vnode => {
        return (
            <div>
                <div class='questionHeadr'>
                    <div class='mainHeader'>
                        שאלה: {vnode.state.title}
                    </div>
                    <div class='subHeader'>{vnode.state.description}</div>
                </div>

                <div class='wrapper groupsWrapper' style="margin-top:150px">
                    {
                        store.options.map((option, index) => {
                            return <Option
                                groupId={vnode.attrs.groupId}
                                questionId={vnode.attrs.id}
                                optionId={option.id}
                                title={option.title} description={option.description}
                                consensusPrecentage={option.consensusPrecentage}
                            />
                        })
                    }
                </div>
                <div class='footer'>
                    <div class='footerButton'>אקראי</div>
                    <div class='footerButton'>Top</div>
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