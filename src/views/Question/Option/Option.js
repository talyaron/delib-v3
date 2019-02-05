import m from 'mithril';
import { set } from 'lodash';
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
            isAnimating: false,
            oldElement: {
                offsetTop: 0,
                offsetLeft:0
            }
        }
        getOptionVote('on', vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.optionId, store.user.uid);
        set(store.optionsDetails, `[${vnode.attrs.optionId}].title`, vnode.attrs.title);
        set(store.optionsDetails, `[${vnode.attrs.optionId }].description`, vnode.attrs.description);
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


        // let beforeElement = document.getElementById(vnode.attrs.optionId);
        // if (beforeElement != null) {
            
        //     vnode.state.oldElement = { offsetTop: beforeElement.offsetTop, offsetLeft: beforeElement.offsetLeft };

        //     if (vnode.attrs.optionId == 'fuPyiBpsBzZVxAEoxK5X') {
        //         console.log('before:', vnode.state.oldElement.offsetTop)
        //     }
        // } else {
        //     if (vnode.attrs.optionId == 'fuPyiBpsBzZVxAEoxK5X') {
        //         console.log('couldnt find it')
        //     }
           
        // }
    },
    onupdate: vnode => {
        
        // console.log('update:', vnode.attrs.title, vnode.dom.offsetTop)
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
        
        if (vnode.attrs.optionId == 'fuPyiBpsBzZVxAEoxK5X') {
            console.log('after:', elementY)
            console.log(topMove)
        }
        // console.log(vnode.attrs.title, vnode.attrs.optionId, topMove, leftMove);
        // console.log(vnode.attrs.key, vnode.attrs.title, topMove, leftMove)
        let elementDOM = document.getElementById(vnode.attrs.optionId)
        if ((Math.abs(topMove) > 30 || Math.abs(leftMove) > 30) && toAnimate) {
           
            if (Math.abs(topMove) > 30 || Math.abs(leftMove) > 30) {
                element.style.background = 'orange'
                //animate
                
                console.log('animate ............', vnode.attrs.title)
                store.optionsLoc[vnode.attrs.optionId] = { offsetTop: 0, offsetLeft: 0, toAnimate: false }

                elementDOM.velocity({ top: (-1 * topMove) + "px", left: (-1 * leftMove) + "px" },
                    {
                        duration: 0,
                        begin: (elms) => {

                        },
                    })
                    .velocity({ top: "0px", left: '0px' }, {
                        duration: 1200,
                        complete: (elms) => {
                            // console.dir(elms)
                            // elementDOM = document.getElementById(vnode.attrs.optionId)
                            
                          
                            // m.redraw();
                        }
                    }, 'easeInOutCubic')

               
            } else {
            //    console.log('no change in ', vnode.attrs.title)
                element.style.background = 'white'
            }
        } else {
            // console.log('NEW ELEMENT....');
            element.style.background = 'green'
        }
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
                        onclick={() => { m.route.set('/optionchat/' + vnode.attrs.groupId +'/'+vnode.attrs.questionId+'/'+vnode.attrs.optionId) }}>
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

