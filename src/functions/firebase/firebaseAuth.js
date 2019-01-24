import store from '../../data/store';
import m from 'mithril';

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
                m.route.set('/groups');
            }
        } else {

            console.log('User is signed out.');
            store.user = {};
        }

    });
}

module.exports = { onAuth, AnonymousLogin }