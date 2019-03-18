import store from '../../data/store';
import m from 'mithril';
import DB from '../firebase/config';
import { listenToFeeds } from '../firebase/get/get';

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

        if (user) {
            console.dir(user)
            console.log('User', store.user.uid, 'is signed in.');
            if (!user.isAnonymous) {
                console.log('user', user.displayName, 'is logged in')
                let userSimpleObj = {
                    uid: store.user.uid,
                    name: store.user.displayName,
                    email: store.user.email
                }

                listenToFeeds();

                DB.collection("users").doc(user.uid).set(userSimpleObj).then(function () {

                }).catch(function (error) {
                    console.error("Error writing User: ", error);
                });

                let lastPage = sessionStorage.getItem('lastPage') || '/groups'
                m.route.set(lastPage);
            } else {


                console.log('user is anonymous')
                // let lastPage = sessionStorage.getItem('lastPage') || '/login'
                let lastPage = '/login'
                m.route.set(lastPage)
            }
        } else {

            console.log('User is signed out.');
            store.user = {};
        }

    });
}

module.exports = { onAuth, AnonymousLogin }