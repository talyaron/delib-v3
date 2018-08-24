import m from 'mithril';
import './Options.css';

module.exports = {
    view: (vnode) => {
        return (
            <div class='headers'>
                <div class='orgHeader'>{store.current.org.name}</div>
                <div class='navSubHeaders'>
                    <ul id='optionsNavTab' class="tabs">
                        <li class="tab col s3"><a>Test 4</a></li>
                        <li class="tab col s3"><a class="active">Test 2</a></li>
                        <li class="tab col s3"><a>Test 4</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}