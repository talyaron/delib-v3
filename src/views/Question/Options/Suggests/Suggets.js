import m from 'mithril'

//components
import Option from '../Suggests/Option/Option';

module.exports = {
    view: vnode => {       
        return (
            vnode.attrs.options.map((option, index) => {
                
                return <Option
                    groupId={vnode.attrs.groupId}
                    questionId={vnode.attrs.questionId}
                    subQuestionId={vnode.attrs.subQuestionId}
                    optionId={option.id}
                    creatorId={option.creatorId}
                    groupCreatorId = {vnode.attrs.creatorId}
                    title={option.title} description={option.description}
                    totalVoters={option.totalVoters}
                    consensusPrecentage={option.consensusPrecentage}                    
                    messagesCounter={option.numberOfMessages}
                    key={index}
                />
            })
        )
    }
}