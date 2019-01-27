import store from '../../data/store';
import m from 'mithril';
import DB from '../firebase/config';

function AnonymousLogin() {
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
}

function onAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
        store.user = user;
        console.log(store.user)
        if (user) {
            console.log('User', store.user.uid, 'is signed in.');
            if (!user.isAnonymous) {


                DB.collection("users").doc(user.uid).set({
                    uid: store.user.uid,
                    name: store.user.displayName,
                    email: store.user.email
                }).then(function () {
                    console.log("Document successfully written!");
                }).catch(function (error) {
                    console.error("Error writing document: ", error);
                });

                m.route.set(store.lastPage);
            }
        } else {

            console.log('User is signed out.');
            store.user = {};
        }

    });
}

module.exports = { onAuth, AnonymousLogin }