import m from "mithril";
import "./TopMenu.css";
// import 'slick-carousel';
// import $ from 'jquery';
import store from '../../../data/store';
import { setNavPostion, setCarouselPage } from './functions';

const TopMenu = {
    oninit: function (vnode) {


    },
    oncreate: function (vnode) {


    },
    onupdate: function (vnode) {

        //set basic navigation button position
        setNavPostion(store.current.slide);
    },
    view: function (vnode) {
        return (
            <div class='topMenu colorTxtDarkHeader'>
                <div id='my' class='topMenuNav' onclick={(e) => setPositions(0)}>
                    <img src='./img/icons8-goodreads-28.png' />
                    <div>My</div>
                </div>
                <div id='others' class='topMenuNav' onclick={(e) => setPositions(1)}>
                    <img src='./img/icons8-user-groups-28.png' />
                    <div>Invitations</div>
                </div>
                <div id='feed' class='topMenuNav' onclick={(e) => setPositions(2)}>
                    <img src='./img/icons8-activity-feed-28.png' />
                    <div>Feed</div>
                </div>
                <div id='alert' class='topMenuNav' onclick={(e) => setPositions(3)}>
                    <img src='./img/icons8-bell-28.png' />
                    <div>Messages</div>
                </div>
            </div>
        )
    }
}

function setPositions(position) {
    store.current.slide = position;
    setNavPostion(position);
    setCarouselPage(position);
}



module.exports = TopMenu; 