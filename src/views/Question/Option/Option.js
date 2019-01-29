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
            isConNegative: false,
            posBefore: { top: 0, left: 0 },
            isAnimating: false
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


        //get before position
        // let elm = document.getElementById(vnode.attrs.optionId)
        // if (elm) {
        //     store.optionsLoc[vnode.attrs.optionId] = {
        //         top: elm.offsetTop,
        //         left: elm.offsetLeft
        //     };
        //     console.log('before:', vnode.attrs.title, vnode.state.posBefore.top, vnode.state.posBefore.left)
        // } else {
        //     vnode.state.posBefore = {top:0, left:0}
        // }



    },
    onupdate: vnode => {
        console.log('option .... update')
        // elm.style.transition = 'none';
        // elm.style.left = vnode.state.posBefore.left+'px';
        // elm.style.top = vnode.state.posBefore.top + 'px';
        
        // if (!vnode.state.isAnimating) {
        //     setTimeout(() => {

        //         let elm = document.getElementById(vnode.attrs.optionId)
        //         vnode.state.posAfter = {
        //             top: elm.offsetTop,
        //             left: elm.offsetLeft
        //         };

        //         console.log('after:', vnode.attrs.title, vnode.state.posAfter.top, vnode.state.posAfter.left)

        //         //move back
        //         let leftMove = vnode.state.posAfter.left - store.optionsLoc[vnode.attrs.optionId].left;
        //         let topMove = vnode.state.posAfter.top - store.optionsLoc[vnode.attrs.optionId].top;

        //         elm.style.transition = 'all 1s';
        //         elm.style.left = (-1 * leftMove) + 'px';
        //         elm.style.top = (-1 * topMove) + 'px';

        //         vnode.state.isAnimating = false;
        //     }, 2000)
        // }
        let elm = document.getElementById(vnode.attrs.optionId)
        vnode.state.posAfter = {
            top: elm.offsetTop,
            left: elm.offsetLeft
        };

        //move back
        let leftMove = vnode.state.posAfter.left - store.optionsLoc[vnode.attrs.optionId].left;
        let topMove = vnode.state.posAfter.top - store.optionsLoc[vnode.attrs.optionId].top;

        console.log('to animate?', !vnode.state.isAnimating)
        if (!vnode.state.isAnimating) {
            console.log('animate', topMove)
            elm.velocity({ top: (-1 * topMove) + "px", left: (-1 * leftMove) + "px" },
                {
                    duration: 0,
                    begin: (elms) => {
                        console.log('animating.................')
                        vnode.state.isAnimating = true;
                    },

                })
                .velocity({ top: "0px", left: '0px' }, {
                    duration: 550,
                    complete: (elms) => {
                        vnode.state.isAnimating = false;
                        // m.redraw();
                    }
                }, 'easeInOutCubic')
        }
        // console.log(leftMove, topMove)
    },
    view: (vnode) => {

        return (
            <div class='card optionCard' id={vnode.attrs.optionId}>
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

