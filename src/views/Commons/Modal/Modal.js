import m from "mithril";
import "./Modal.css";

import { createOption } from "../../../functions/firebase/set/set";

import store from "../../../data/store";

module.exports = {
  oninit: vnode => {
    let isSubquestion = false;
    if (vnode.attrs.whichModal === "subQuestion") {
      isSubquestion = true;
    }

    vnode.state = {
      showModal: vnode.attrs.showModal,
      isSubquestion: isSubquestion,
      ParentVnode: vnode.attrs.vnode,
      add: {
        title: "",
        description: "",
        more:{text:'', URL:''}       
      }
    };

    
  },
  onbeforeupdate: vnode => {
    vnode.state.showModal = vnode.attrs.showModal;
  },
  view: vnode => {
    let vnp = vnode.state.ParentVnode;
    return (
      <div>
        {vnode.state.showModal ? (
          <div class="module">
            <div class="moduleBox">
              <div class="moduleTitle">{vnode.attrs.title}</div>
              <div class="moduleInputs">
                <textarea
                  class="moduleQuestionTitle"
                  autofocus="true"
                  placeholder={vnode.attrs.placeholderTitle}
                  onkeyup={e => {
                    vnode.state.add.title = e.target.value;
                  }}
                ></textarea>
                <textarea
                  class="moduleQuestionTitle moduleDescription"
                  placeholder={vnode.attrs.placeholderDescription}
                  onkeyup={e => {
                    vnode.state.add.description = e.target.value;
                  }}
                ></textarea>
                {vnode.state.isSubquestion ? (
                  <div class="modalMoreInfo">
                    <div class="moduleTitle">קישור לקובץ חיצוני</div>
                    <input
                      class="moduleQuestionTitle"
                      value={vnode.state.add.moreText}
                      type="text"
                      placeholder="טקסט"
                      oninput={(e)=>{vnode.state.add.more.text = e.target.value}}
                    ></input>
                    <input
                      class="moduleQuestionTitle"
                      value={vnode.state.add.moreURL}
                      type="url"
                      placeholder="URL"
                      oninput={(e)=>{vnode.state.add.more.URL = e.target.value}}
                    ></input>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div class="moduleButtons">
                <div
                  class="buttons confirm"
                  onclick={() => {
                    setNewInfo(vnp, vnode);
                    toggleShowModal("off", vnode);
                  }}
                >
                  הוספה
                </div>
                <div
                  class="buttons cancel"
                  onclick={() => {
                    toggleShowModal("off", vnode);
                  }}
                >
                  ביטול
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
};

function setNewInfo(vnp, vnode) {
  //in question, questionId is called id. These is used to fix the problem
  let questionId, subQuestionId;

  if (vnp.attrs.hasOwnProperty("id")) {
    questionId = vnp.attrs.id;
    subQuestionId = vnp.state.showModal.subQuestionId;
  } else {
    questionId = vnp.attrs.questionId;
    subQuestionId = vnp.attrs.subQuestionId;
  }

  console.log(
    vnode.state
  );

  createOption(
    vnp.attrs.groupId,
    questionId,
    subQuestionId,
    vnp.state.showModal.which,
    store.user.uid,
    vnode.state.add.title,
    vnode.state.add.description,
    vnode.state.add.more.text,
    vnode.state.add.more.URL
  );

  vnp.state.showModal.isShow = false;
}

function toggleShowModal(onOff, vnode) {
  if (onOff == "on") {
    vnode.state.showModal = true;
  } else {
    vnode.state.ParentVnode.state.showModal.isShow = false;
  }
}
