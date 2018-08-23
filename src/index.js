const m = require('mithril');
const root = document.body;
import './style.css';

//Views
import Splash from "./views/Splash/Splash";
import Main from "./views/Main/Main";

m.route(root, "/splash", {
    "/splash": Splash,
    "/main": Main,
})