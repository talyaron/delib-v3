function deep_value(obj, path, alternativeValue) {

    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {

        if (obj.hasOwnProperty(path[i])) {
            obj = obj[path[i]];

        } else {
            return alternativeValue
        }
    };


    return obj;
};


function setWrapperHeight(headerId, wrapperId) {
    let header = document.getElementById(headerId);
    if (header != null) {
        let headerHeight = header.clientHeight;
        document.getElementById(wrapperId).style.top = headerHeight + 'px';

    } else {
        console.error('No such header exists')
    }
}

function setWrapperFromFooter(footerId, wrapperId) {
    let footerHeight = document.getElementById(footerId).clientHeight;
    document.getElementById(wrapperId).style.marginBottom = footerHeight + 30 + 'px'
}

function returnUserRole(rolesObj, userUID) {
    if (rolesObj.hasOwnProperty(userUID)) {
        return rolesObj[userUID];
    } else {
        return false;
    }
}

module.exports = { deep_value, setWrapperHeight, setWrapperFromFooter, returnUserRole }