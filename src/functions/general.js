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

class Reference {
    constructor(path, type, collectionOrDoc) {
        //type can be 'array', 'string--', 'string/'
        let types = [
            'array', 'stringDash', 'stringSlash'
        ];


        this.path = path;
        this.type = type;
        this.collectionOrDoc = collectionOrDoc;
        if (!types.includes(this.type)) {
            console.error(`Type ${this.type}, is not recognized by class Reference`)
            return
        }

        if (!(this.collectionOrDoc == 'collection' || this.collectionOrDoc == 'doc')) {
            console.error(`Please specify if 'collection' or 'doc'.  ${collectionOrDoc} was set in class Reference`);
            return;
        }
    }

    fromArrayToSring() {
        let refString = '';

        if (this.collectionOrDoc === 'collection') {

            //concatinate a path
            for (let i = 0; i < this.path.length; i++) {
                if (i == 0) {
                    refString += this.path[i]
                } else {
                    refString += '--' + this.path[i]
                }

            }
            return refString;

        } else {
            console.log('didnt created doc convertor yet');
            return false;
        }
    }
}

function createRefString(refArray, collectionOrDoc) {
    //conver array that represnet a Reference to sting Reference


}

module.exports = { Reference, createRefString, msToTime, deep_value, setWrapperHeight, setWrapperFromFooter, returnUserRole }