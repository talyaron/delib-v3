// Initialize Firebase
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

var config = {
    apiKey: "AIzaSyAjyyjWM63PSjyRoDI-87MpRtfOFnOO0aA",
    authDomain: "delib21-aaeb0.firebaseapp.com",
    databaseURL: "https://delib21-aaeb0.firebaseio.com",
    projectId: "delib21-aaeb0",
    storageBucket: "delib21-aaeb0.appspot.com",
    messagingSenderId: "845650714645"
};
firebase.initializeApp(config);
const DB = firebase.firestore();
DB.settings({
    timestampsInSnapshots: true
});

module.exports = DB;