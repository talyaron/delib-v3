import m from "mithril";
import './Splash.css';
import { setTimeout } from "timers";

const Splash = {
    view: function (vnode) {
        return (
            <div id='splashScreen' class='splashMain colorBckStrong'>
                <div class='splashCenter'>
                    <div class='splashTitle colorTxtWhiteStrong'>
                        Groupicks.com
                    </div>
                    <div class='splashSubTitle colorTxtWhiteStrong'>
                        Let's decide togther
                    </div>
                    <div class='buttons buttonStart' onclick={() => { flipPage(vnode) }}>
                        START
                    </div>
                </div>
            </div>
        )
    }
}

var flipPage = function (vnode) {
    var screen = document.getElementById(vnode.dom.id);
    screen.classList.add("flipLeft");
    setTimeout(() => { m.route.set('/main') }, 500)
    // m.route.set('/main')
}

module.exports = Splash 