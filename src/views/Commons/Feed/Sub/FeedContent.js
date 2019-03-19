import m from 'mithril';
import './FeedContent.css';



module.exports = {
    oninit: vnode => {

    },
    view: (vnode) => {

        return (
            <div class='feedContent'
                onclick={() => { m.route.set(convertPathToLink(vnode.attrs.path)) }}
            >
                <div class='feedContentMessage'>{vnode.attrs.message}</div>
                <div class='feedContentName'>{vnode.attrs.creatorName}</div>
            </div>
        )
    }
}

//functions
function convertPathToLink(path) {
    let parsedPath = path.split('--');

    console.log(parsedPath);
    if (parsedPath[parsedPath.length - 1] == 'messages') {
        return `/optionchat/${parsedPath[1]}/${parsedPath[3]}/${parsedPath[5]}`;
    } else if (parsedPath[parsedPath.length - 1] == 'questions') {
        return `/question/${parsedPath[1]}/${parsedPath[3]}`;
    } else if (parsedPath[parsedPath.length - 1] == 'groups') {
        return `/group/${parsedPath[1]}`;
    } else {
        return false;
    }


}




