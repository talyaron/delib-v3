import m from 'mithril';
import './Options.css';

import Option from './Option/Option';

import store from '../../../data/store';
//functions


module.exports = {
    oninit: vnode => {
        console.log(`init`)
    },
    view: (vnode) => {

        return (
            <div class='wrapper groupsWrapper' id='optionsWrapper' >
                <div class='questionSection'>
                    <div
                        class='questionSectionTitle questions'
                        style={`color:${vnode.attrs.info.colors.color}; background:${vnode.attrs.info.colors.background}`}
                    >{vnode.attrs.info.name}</div>
                    {

                        vnode.attrs.subItems.map((option, index) => {

                            return <Option
                                groupId={vnode.attrs.groupId}
                                questionId={vnode.attrs.questionId}
                                optionId={option.id}
                                creatorId={option.creatorId}
                                title={option.title} description={option.description}
                                consensusPrecentage={option.consensusPrecentage}
                                background={vnode.attrs.info.colors.backgroundItem}
                                messagesCounter={option.numberOfMessages}
                                key={index}
                            />
                        })
                    }
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
    console.log(type)
    vnode.attrs.parentVnode.state.showModal = { which: type, isShow: true, title: 'הוסף אפשרות' };
}