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
    let headerHeight = document.getElementById(headerId).clientHeight;
    document.getElementById(wrapperId).style.top = headerHeight + 'px'
}

function setRapperFromFooter(footerId, wrapperId) {
    let footerHeight = document.getElementById(footerId).clientHeight;
    document.getElementById(wrapperId).style.marginBottom = footerHeight + 30 + 'px'
}
module.exports = { deep_value, setWrapperHeight, setRapperFromFooter }