import m from 'mithril';

import './Option.css';
import store from '../../../data/store';

import { setLike } from '../../../functions/firebase/set/set';
import { getOptionVote } from '../../../functions/firebase/get/get';


module.exports = {
    oninit: vnode => {

        vnode.state = {
            up: false,
            down: false,
            consensusPrecentage: '',
            isConNegative: false,
            posBefore: { top: 0, left: 0 },
            isAnimating: false,
            oldElement: {
                offsetTop: 0,
                offsetLeft: 0
            }
        }
        console.log('option:', store.user.uid)
        vnode.state.likeUnsubscribe = getOptionVote(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid);

        store.optionsDetails[vnode.attrs.optionId] = {
            title: vnode.attrs.title,
            description: vnode.attrs.description
        }
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
    onupdate: vnode => {


        //animation 
        let element = vnode.dom
        let elementY = element.offsetTop
        let elementX = element.offsetLeft;
        let oldElement = { offsetTop: 0, offsetLeft: 0 };
        let toAnimate = false;

        if (store.optionsLoc.hasOwnProperty(vnode.attrs.optionId)) {
            oldElement = store.optionsLoc[vnode.attrs.optionId];
            toAnimate = store.optionsLoc[vnode.attrs.optionId].toAnimate;
        }

        let topMove = elementY - oldElement.offsetTop;
        let leftMove = elementX - oldElement.offsetLeft;

        if ((Math.abs(topMove) > 30 || Math.abs(leftMove) > 30) && toAnimate) {
            let elementDOM = document.getElementById(vnode.attrs.optionId);

            //animate
            store.optionsLoc[vnode.attrs.optionId] = { offsetTop: 0, offsetLeft: 0, toAnimate: false }

            elementDOM.velocity({ top: (-1 * topMove) + "px", left: (-1 * leftMove) + "px" },
                {
                    duration: 0,
                    begin: (elms) => {
                    },
                })
                .velocity({ top: "0px", left: '0px' }, {
                    duration: 750,
                    complete: (elms) => { }
                }, 'easeInOutCubic');
        }
    },
    onremove: vnode => {
        vnode.state.likeUnsubscribe();
    },
    view: (vnode) => {

        return (
            <div class='card optionCard' id={vnode.attrs.optionId} key={vnode.attrs.key}>
                <div class='optionMain'>
                    <div class={vnode.state.up ? 'optionVote optionSelcetUp' : 'optionVote'} onclick={() => { setSelection('up', vnode) }}>
                        <img
                            class={vnode.state.up ? 'voteUp' : ''}
                            src='img/icons8-facebook-like-32.png'
                        />
                    </div>
                    <div class='optionContent'
                        onclick={() => { m.route.set('/optionchat/' + vnode.attrs.groupId + '/' + vnode.attrs.questionId + '/' + vnode.attrs.optionId) }}>
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



