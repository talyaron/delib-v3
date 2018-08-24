import m from 'mithril';
import './Header.css';

module.exports = {
    oncreate: (vnode) => {
        colorHeader(vnode);
        initTabsHeader();
        setColors(vnode);


    },
    view: (vnode) => {
        return (
            <div class='headers'>
                <div id='topHeader'>{vnode.attrs.topic}: {vnode.attrs.title}</div>
                <div class='navSubHeaders'>
                    <ul id='navTab' class="tabs">
                        <li class="tab col s3 "><a >Test 4</a></li>
                        <li class="tab col s3"><a class="active">Test 2</a></li>
                        <li class="tab col s3"><a>Test 4</a></li>

                    </ul>
                </div>
            </div>
        )
    }
}

function colorHeader(vnode) {
    console.dir(vnode.dom)
}

function initTabsHeader() {
    var instance = M.Tabs.init(document.getElementById('navTab'), {});
}

function setColors(vnode) {
    $('#topHeader').css("color", vnode.attrs.color || 'gray');
    $('#topHeader').css("background-color", vnode.attrs.tabBkgColor || 'white');
    // TAB Color
    $(".tabs").css("background-color", vnode.attrs.tabBkgColor || 'white');

    // TAB Indicator/Underline Color
    $(".tabs>.indicator").css("background-color", vnode.attrs.color || 'gray');

    // TAB Text Color
    $(".tabs>li>a").css("color", vnode.attrs.color || 'gray');
}