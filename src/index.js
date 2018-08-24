const m = require('mithril');
const root = document.body;
import './style.css';

//Views
import Splash from "./views/Splash/Splash";
import Delib from "./views/Delib/Delib";

m.route(root, "/splash", {
    "/splash": Splash,
    "/delib": Delib,
    '/option/:id': Option,
    'options/': Options,
    'team/:id': Team,
    'org/:id': Org,
    'messages/:id': Messages
})