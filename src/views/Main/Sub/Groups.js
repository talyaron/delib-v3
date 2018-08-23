import m from "mithril";

// import store from '../../../data/store';

import "./Groups.css";
import Group from "./Group";

const Groups = {

    view: function (vnode) {
        return (
            <div class='groups'>
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
                <Group />
            </div>
        )
    }
}



module.exports = Groups; 