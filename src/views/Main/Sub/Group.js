import m from "mithril";

// import store from '../../../data/store';

import "./Group.css";

const Group = {

    view: function (vnode) {
        return (
            <div class='group'>
                <img src='./img/flowerBlue.jpg' class='groupImg' />
                <div class='groupContent'>
                    <div class='groupTitle'>Group Title</div>
                    <div class='groupDetails'>
                        <div class='groupOwner'>Owner: Sam Brokin</div>
                        <div class='groupMembers'>Members: 20</div>
                    </div>
                    <div class='groupTime'>12:45:32</div>
                </div>
            </div>
        )
    }
}



module.exports = Group; 