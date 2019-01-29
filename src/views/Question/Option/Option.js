import m from 'mithril';
import './Option.css';
import store from '../../../data/store';

import { setLike } from '../../../functions/firebase/set/set';
import { getOptionVote } from '../../../functions/firebase/get/get';
import { json } from 'body-parser';

module.exports = {
    oninit: vnode => {
        vnode.state = {
            up: false,
            down: false,
            consensusPrecentage: '',
            isConNegative: false
        }
        getOptionVote('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid);
    },
    onbeforeupdate: vnode => {
        let optionVote = store.optionsVotes[vnode.attrs.optionId]
        
        //set conesnsus level to string
        if (vnode.attrs.consensusPrecentage !== undefined) {
            if (vnode.attrs.consensusPrecentage >= 0) {
                vnode.state.consensusPrecentage = Math.round(vnode.attrs.consensusPrecentage * 100) + "%";
                vnode.state.isConNegative = false;
            } else {
                vnode.state.consensusPrecentage = Math.abs(Math.round(vnode.attrs.consensusPrecentage * 100)) + "%" + ' -'
                vnode.state.isConNegative = true;
            }
        }



        if (optionVote > 0) {
            
            vnode.state.up = true;
            vnode.state.down = false;
        } else if (optionVote < 0) {
           
            vnode.state.up = false;
            vnode.state.down = true;
        } else {
           
            vnode.state.up = false;
            vnode.state.down = false;
        }
        
    },
    view: (vnode) => {

        return (
            <div class='card optionCard'>
                <div class='optionMain'>
                    <div class={vnode.state.up ? 'optionVote optionSelcetUp' : 'optionVote'} onclick={() => { setSelection('up', vnode) }}>
                        <img
                            class={vnode.state.up ? 'voteUp' : ''}
                            src='img/icons8-facebook-like-32.png'
                        />
                    </div>
                    <div class='optionContent'>
                        <div class='cardTitle'>{vnode.attrs.title}</div>
                        <div class='cardDescription'>{vnode.attrs.description}</div>
                    </div>
                    <div class={vnode.state.down ? 'optionVote optionSelcetDown' : 'optionVote'} onclick={() => { setSelection('down', vnode) }}>
                        <img
                            class={vnode.state.down ? 'voteDown' : ''}
                            src='img/icons8-thumbs-down-32.png' />
                    </div>
                </div>
                <div class='optionInfo'>
                    <div class={vnode.state.isConNegative ? 'optionLikes negative' : 'optionLikes'}>
                        הסכמה: {vnode.state.consensusPrecentage}
                    </div>
                    <div class='optionChat'>
                        שיחות: 45
                    </div>
                </div>
            </div>
        )

    }
}

function setSelection(upDown, vnode) {
    if (upDown == 'up') {
        vnode.state.up = !vnode.state.up;
        vnode.state.down = false;

        if (vnode.state.up) {
            setLike(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid, 1)
        } else {
            setLike(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid, 0)
        }
    } else {
        vnode.state.down = !vnode.state.down;
        vnode.state.up = false;
        if (vnode.state.down) {
            setLike(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid, -1)
        } else {
            setLike(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid, 0)
        }
    }
}

