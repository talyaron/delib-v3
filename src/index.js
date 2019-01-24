const m = require('mithril');
const root = document.body;
import './style.css';

//functions
import './functions/firebase/config';
import { onAuth } from './functions/firebase/firebaseAuth';
onAuth();

//Views
import Splash from "./views/Splash/Splash";
import Groups from "./views/Groups/Groups";



m.route(root, "/splash", {
    "/splash": Splash,
    "/groups": Groups

})