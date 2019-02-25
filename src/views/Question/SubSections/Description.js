import m from 'mithril';
import './Description.css';



module.exports = {

    view: (vnode) => {
        return (
            <div class='questionSection'>
                <div class='questionSectionTitle questions'>הסבר על השאלה</div>
                <div class='questionSectionMain'>
                    {vnode.attrs.content}
                </div>
                <div class='questionSectionFooter'>
                    <div class='buttons questionSectionAddButton'>הוסף הסבר</div>
                </div>
            </div>
        )
    }
}

