import React from 'react'
import ContentSection from './ContentSection'
import ScoreSection from './ScoreSection'
import DeleteEditReplyButtons from './DeleteEditReplyButtons'
import ReplySection from '../ReplySection'

const Replies = ({comment, state, dispatch, localData}) => {

  return (
    <div className='theBiggestReplyBox'>
    {comment.replies.map(reply => {
      return (
        <div key={reply.id} className="boxOfReplyBox">
        <div  className='replyBox'>

        
        <ScoreSection state={state} dispatch={dispatch} reply={reply} localData={localData}/> 
        <ContentSection state={state} dispatch={dispatch} reply={reply} localData={localData}/>
        <DeleteEditReplyButtons state={state} dispatch={dispatch} comment={comment} reply={reply} localData={localData}/>
            

        </div>

        {state.replyId === reply.id ? 
          <ReplySection 
            state={state}
            dispatch={dispatch}
            comment={comment}
            reply={reply}
          />:
          ""}
      </div>
        

       
      )
    })}
    
    </div> 
   )
}

export default Replies