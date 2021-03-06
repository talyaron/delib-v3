import m from "mithril";
import store from "../../data/store";
import settings from '../../data/settings';

//components
import SubQuestion from "../Question/SubQuestions/SubQuestion";
import Modal from '../Commons/Modal/Modal';
import Spinner from '../Commons/Spinner/Spinner';

//functions
import { getSubQuestion } from "../../functions/firebase/get/get";
import { set } from 'lodash';

let unsubscribe = () => { };

module.exports = {
  oninit: vnode => {
    //get user before login to page
    store.lastPage = `/subquestions/${vnode.attrs.groupId}/${vnode.attrs.questionId}/${vnode.attrs.subQuestionId}`;
    sessionStorage.setItem("lastPage", store.lastPage);

    vnode.state = {
      orderBy: "new",
      options: [false],
      details: {
        title: false,
        options: []
      },
      showModal: {
        isShow: false,
        which: 'subQuestion',
        title: 'הוספת אפשרות'
      }
    };
  },
  oncreate: vnode => {
    unsubscribe = getSubQuestion(
      vnode.attrs.groupId,
      vnode.attrs.questionId,
      vnode.attrs.subQuestionId

    );
  },
  onbeforeupdate: vnode => {

    if (store.subQuestions.hasOwnProperty(vnode.attrs.subQuestionId)) {
      vnode.state.details = store.subQuestions[vnode.attrs.subQuestionId]
    }

  },
  onremove: vnode => {
    unsubscribe();
  },
  view: vnode => {
    return (
      <div>
        {vnode.state.details.title ? (
          <div>
            <SubQuestion
              groupId={vnode.attrs.groupId}
              questionId={vnode.attrs.questionId}
              subQuestionId={vnode.attrs.subQuestionId}
              orderBy={vnode.state.orderBy}
              title={vnode.state.details.title}
              subItems={vnode.state.details.options}
              parentVnode={vnode}
              info={settings.subItems.options}
              processType={vnode.state.details.processType}
              isAlone={true}
            />
            <div class='fav' onclick={()=>{vnode.state.showModal.isShow = true }}><div>+</div></div>
            <Modal
              showModal={vnode.state.showModal.isShow}
              whichModal={vnode.state.showModal.which}
              title={vnode.state.showModal.title}
              placeholderTitle='כותרת'
              placeholderDescription='הסבר'
              vnode={vnode}
            />

          </div>
        ) : (
            <Spinner />
          )}
      </div>
    );
  }
};
