import m from 'mithril';
import './Splash.css';

//functions
import googleLogin from '../../functions/firebase/googleLogin';

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
                    <div class="buttons loginButton" onclick={() => { googleLogin() }}>
                        <div>התחברות עם גוגל</div>
                        <img src='img/icons8-google.svg'></img>
                    </div>
                </div>
            </div>
        )
    }
}