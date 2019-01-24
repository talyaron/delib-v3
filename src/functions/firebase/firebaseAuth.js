import store from '../../data/store'

firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
});

firebase.auth().onAuthStateChanged(function (user) {
    store.user = user;
    console.log(store.user)
    if (user) {
        console.log('User', store.user.uid, 'is signed in.');
    } else {

        console.log('User is signed out.');
        store.user = {};
    }

});