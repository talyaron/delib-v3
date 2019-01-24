// Initialize Firebase
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

var config = {
    apiKey: "AIzaSyBEumZUTCL3Jc9pt7_CjiSVTxmz9aMqSvo",
    authDomain: "synthesistalyaron.firebaseapp.com",
    databaseURL: "https://synthesistalyaron.firebaseio.com",
    projectId: "synthesistalyaron",
    storageBucket: "synthesistalyaron.appspot.com",
    messagingSenderId: "799655218679"
};
firebase.initializeApp(config);
const DB = firebase.firestore();
window.db = DB;
DB.settings({
    timestampsInSnapshots: true
});

module.exports = DB;