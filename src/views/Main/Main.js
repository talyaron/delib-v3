import m from "mithril";
import "./Main.css";
import TopMenu from "./Sub/TopMenu";
import Carousel from './Sub/Carousel';

const Main = {
    view: function (vnode) {
        return (
            <div class='mainPage'>
                <div class='topMainHeader'>
                    <div class='topHeader'>Groupicks</div>
                    <TopMenu />
                </div>
                <div class='carouselWrapper'>
                    <Carousel />
                </div>
                <div class='addGroupy'><div>+</div></div>
            </div>
        )
    }
}

module.exports = Main 