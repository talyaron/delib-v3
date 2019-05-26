import m from 'mithril';
import './SplashPage.css';

//functions


module.exports = {

    view: (vnode) => {
        return (
            <div
                class='page splashPage'
                href='/delib'
                oncreate={m.route.link}
            >
                <div class='splasheMainTitle'>
                    שומרון רבתי
                </div>
            </div>
        )
    }
}