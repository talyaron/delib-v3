import m from "mithril";
import "./Votes.css";

module.exports = {
  oninit: vnode => {},

  view: vnode => {
    console.dir(vnode.attrs.options);
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
              <div class="voteButton">{option.title}</div>
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
