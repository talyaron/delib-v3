import m from "mithril";
import "./Votes.css";
import {setVote} from '../../../../functions/firebase/set/set';
import {getVotes} from '../../../../functions/firebase/get/get';

module.exports = {
  oninit: vnode => {
    vnode.state = {
      unsubscribe:()=>{},
      optionsVotes:false,
      options:[]
    }

    
  },
  oncreate:vnode=>{
    let va = vnode.attrs;
    vnode.state.unsubscribe = getVotes(va.groupId, va.questionId, va.subQuestionId, vnode)
  },
  onbeforeupdate:vnode=>{
    
    if(vnode.state.optionsVotes !== false && vnode.attrs.options.length > 0){
      vnode.state.options = vnode.attrs.options;
      for(let i in vnode.state.options){
        let optionId = vnode.state.options[i].id
     
        vnode.state.options[i].votes = vnode.state.optionsVotes[optionId] || 0;
      }
    } else {
      vnode.state.options = vnode.attrs.options;
    }
  },
  onremove:vnode=>{
    vnode.state.unsubscribe();
  },
  view: vnode => {
   
    return (
      <div class="voteWrapper">
        {vnode.attrs.options.map((option, index) => {
          let votes = option.votes || 0;
          let optionHeight = `${(100 * votes) / getMaximumVotes(vnode)}%`;

          return (
            <div
              class="voteOption"
              key={index}
              style={`height:${optionHeight}`}
            >
              <div class="voteColumn">{votes}</div>
              <div class="voteButton"
                onclick={()=>{setVote(vnode.attrs.groupId, vnode.attrs.questionId, vnode.attrs.subQuestionId,option.id, vnode.attrs.creatorId,1)}}
              >{option.title}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

function getMaximumVotes(vnode) {
  //get maximum votes
  let votesArray = [];
  vnode.attrs.options.forEach(element => {
    if (typeof element.votes === "number") {
      votesArray.push(element.votes);
    }
  });

  return Math.max(...votesArray);
}
