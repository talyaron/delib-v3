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
        headerHeight += 10
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

function msToTime(initMilliseconds) {
    var milliseconds = parseInt((initMilliseconds % 1000) / 100),
        seconds = Math.floor((initMilliseconds / 1000) % 60),
        minutes = Math.floor((initMilliseconds / (1000 * 60)) % 60),
        hours = Math.floor((initMilliseconds / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

module.exports = { msToTime, deep_value, setWrapperHeight, setWrapperFromFooter, returnUserRole }