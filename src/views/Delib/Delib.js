import m from 'mithril';
import './Delib.css';

//data
import store from '../../data/store';

module.exports = {
    oninit: (vnode) => {
        vnode.state = {
            order: 'אנא מלאו את שמכם'
        }
    },
    oncreate: (vnode) => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    },
    view: (vnode) => {
        return (
            <div class='page delibPage darken-3-text'>
                <div class='centerElement'>
                    <div id='splashName'>
                        Delib
                    </div>
                    <div id='splashSubName'>
                        {vnode.state.order}
                    </div>

                    <div class="input-field centerInput" dir='rtl'>
                        <input
                            placeholder="שם מלא" id="user_name" type="text" class="validate"
                            onkeyup={(e) => getName(e, vnode)}
                        />

                    </div>

                    <div id='selectOrg' class="input-field centerInput">
                        <select
                            onchange={(e) => { m.route.set('org/' + e.target.value) }}
                        >
                            <option value="" disabled selected>בחרו את הארגון שלכם</option>
                            <option value="tel-aviv" >עיריית תל-אביב</option>
                            <option value="ramat-gan">עיריית רמת גן</option>
                            <option value="petach-tiqua">עיריית פתח-תקווה</option>
                        </select>
                        <label></label>
                    </div>
                </div>
            </div>
        )
    }
}

const getName = (e, vnode) => {
    e.preventDefault();

    if (e.keyCode == 13) {
        selectOrg.style.opacity = '1';
        if (store.user.isAnonymous) {
            store.user.nickName = e.target.value;
        }
        vnode.state.order = 'אנא בחרו ארגון'
    }
}