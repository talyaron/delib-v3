const m = require('mithril');
const root = document.body;
import './style.css';

//functions
import './functions/firebase/config';
import { onAuth } from './functions/firebase/firebaseAuth';
onAuth();
m.route.prefix('?')

//Views
import SplashPage from "./views/SplashPage/SplashPage";


m.route(root, "/splash", {
    "/splash": SplashPage,

})


