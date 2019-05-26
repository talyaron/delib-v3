const m = require('mithril');
const root = document.body;
import './style.css';

//functions
import './functions/firebase/config';

m.route.prefix('?')

//Views
import SplashPage from "./views/SplashPage/SplashPage";
import SearchPage from "./views/SearchPage/SearchPage";


m.route(root, "/splash", {
    "/splash": SplashPage,
    "/search/:type": SearchPage

})


