import React from 'react'
import Replies from '../replies/Replies'
import ScoreSection from './ScoreSection'
import ContentSection from './ContentSection'
import DeleteEditReplyButtons from './DeleteEditReplyButtons'
import ReplySection from '../ReplySection'

const Comments = ({state, dispatch}) => {


  return (
    <div>
    {state.currentComments.map((comment) => {
      return (
       <div key={comment.id} className='box'>
    
       <div className='commentBox'>
 
         
           <ScoreSection comment={comment} state={state} dispatch={dispatch} />
           <ContentSection comment={comment} state={state} dispatch={dispatch} />
           <DeleteEditReplyButtons comment={comment} state={state} dispatch={dispatch} />
         
        
        
       </div>

       {state.replyId === comment.id ? 
        <ReplySection 
          state={state}
          dispatch={dispatch}
          comment={comment}
        />:
        ""}

        {comment.replies ? <Replies 
        comment={comment} 
        state={state} 
        dispatch={dispatch}
        
        /> 
        : 
        ""}

 
       </div>
      ) 
     })}
    
   </div>
  
  )
}

export default Comments
