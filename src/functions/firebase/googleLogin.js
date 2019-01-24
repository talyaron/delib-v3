import m from 'mithril';
import store from '../../data/store';

import DB from '../firebase/config';

function googleLogin() {
    console.log('...')
    var provider = new firebase.auth.GoogleAuthProvider();


    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        // store.user = result.user;
        console.log(`user is logged in with google`)



        m.route.set('/groups')
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
}

module.exports = googleLogin;