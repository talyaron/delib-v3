import m from 'mithril';
import store from '../data/store';

function restrictedPage(URLPath, pathInDB) {
    //check if user is logged-in and has permission to view the page

    //check if user is logged-in, else redirect to login
    if (store.user.hasOwnProperty('isAnonymous')) {
        if (store.user.isAnonymous) {
            redirectToLogin();
            return false
        }
    } else {
        redirectToLogin();
        return false;
    }
}

function redirectToLogin() {
    store.lastPage = URLPath;
    m.route.set('/login');
}

module.exports = { restrictedPage }