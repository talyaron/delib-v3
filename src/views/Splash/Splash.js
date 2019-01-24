import m from 'mithril';
import './Splash.css';

module.exports = {
    oncreate: (vnode) => {
        // setTimeout(() => { m.route.set('/delib') }, 2500)
    },
    view: (vnode) => {
        return (
            <div
                class='page splashPage'
                href='/delib'
                oncreate={m.route.link}
            >
                <div class='centerElement'>
                    <div id='splashName'>
                        Delib
                    </div>
                    <div id='splashSubName'>
                        מחליטים ביחד
                    </div>
                    <a class="buttons loginButton"><div>התחברות עם גוגל</div><img src='img/icons8-google.svg'></img></a>
                </div>
            </div>
        )
    }
}