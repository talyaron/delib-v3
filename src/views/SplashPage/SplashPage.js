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
                <div>
                    שומרון רבתי
                </div>
            </div>
        )
    }
}