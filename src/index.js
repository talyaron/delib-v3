const m = require('mithril');
const root = document.body;
import './style.css';

//functions
import './functions/firebase/config';
import { onAuth } from './functions/firebase/firebaseAuth';
onAuth();
m.route.prefix('?')

//Views
import Login from "./views/Login/Login";
import Groups from "./views/Groups/Groups";
import GroupPage from './views/GroupPage/GroupPage';
import Question from './views/Question/Question';
import QuestionEdit from './views/QuestionEdit/QuestionEdit';
import ChatPage from './views/ChatPage/ChatPage';

m.route(root, "/splash", {
    "/splash": Login,
    "/groups": Groups,
    "/group/:id": GroupPage,
    '/question/:groupId/:id': Question,
    "/questionEdit/:groupId/:questionId": QuestionEdit,
    '/optionchat/:groupId/:questionId/:optionId': ChatPage

})


