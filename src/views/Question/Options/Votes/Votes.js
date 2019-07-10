import m from "mithril";
import "./Votes.css";

module.exports = {
  oninit: vnode => {
    vnode.state = {
      options: [
        { votes: 0, name: "pro" },
        { votes: 0, name: "abst" },
        { votes: 1, name: "con" }
      ]
    };
  },
  view: vnode => {
    return (
      <div class="voteWrapper">
        {vnode.state.options.map((option, index) => {
           let optionHeight = `${100*option.votes/getMaximumVotes(vnode)}%`;
           console.log(option.name, optionHeight)
          return (
            <div class="voteOption" key={index} style={`height:${optionHeight}`}>
              <div class='voteColumn' >{option.votes}</div>
              <div class='voteButton'>{option.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

function getMaximumVotes(vnode){
    //get maximum votes
    let votesArray = [];
    vnode.state.options.forEach(element => {
        if(typeof element.votes === 'number'){
        votesArray.push(element.votes);
        } else {
            console.error(element.votes, 'is not a number');
        }
    });    
    
     return Math.max(...votesArray);
}
