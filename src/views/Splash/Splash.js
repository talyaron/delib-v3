import m from 'mithril';
import './Splash.css';

module.exports = {
    view: (vnode) => {
        return (
            <div class='page splashPage'>
                <div id='splashCenter'>
                    <div id='splashName'>
                        Delib
                    </div>
                    <div id='splashSubName'>
                        מחליטים ביחד
                    </div>
                    <a class="waves-effect waves-light grey darken-3 btn">כניסה</a>
                </div>
            </div>
        )
    }
}