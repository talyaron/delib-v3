import m from 'mithril';

//componenets
import MapComp from './MapComp';

//model
import store from '../../data/store';

module.exports = {
    oninit:vnode=>{
        console.dir(vnode.attrs);

         //get user before login to page
         store.lastPage = '/map/' + vnode.attrs.groupId + '/' + vnode.attrs.questionId+'/'+vnode.attrs.subQuestionId;
         sessionStorage.setItem('lastPage', store.lastPage);         
 
         //check to see if user logged in
         if (store.user.uid == undefined) {
             m.route.set('/login');            
         } 
    },
    view:vnode=>{
        return(
            <MapComp ref={vnode.attrs}/>
        )
    }
}