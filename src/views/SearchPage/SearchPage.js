import m from 'mithril';
import './SearchPage.css';

//functions


module.exports = {
    oninit: vnode => {
        //get type
        if (vnode.attrs.type === 'phones' || vnode.attrs.type === 'culture' || vnode.attrs.type === 'business') {
        } else {
            vnode.attrs.type = 'phones'
        }


    },

    view: vnode => {
        return (
            <div class='page searchPage'>
                <div class='searchMainTitle'>שומרון רבתי</div>
                <img class='commercial' src='img/commercial1.jpg'></img>
                <div class='searchBox'>
                    <input type='text' placeholder='חיפוש מספר טלפון' autofocus />
                </div>
            </div>

        )
    }
}