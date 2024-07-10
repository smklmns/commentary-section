import React from 'react'
import Replies from '../replies/Replies'
import ScoreSection from './ScoreSection'
import ContentSection from './ContentSection'
import DeleteEditReplyButtons from './DeleteEditReplyButtons'
import ReplySection from '../ReplySection'

const Comments = ({state, dispatch, localData}) => {


  return (
    <div>
    {localData.comments.map((comment) => { 
      return (
       <div key={comment.id} className='box'>
    
       <div className='commentBox'>
 
         
           <ScoreSection comment={comment} state={state} dispatch={dispatch} localData={localData}/>
           <ContentSection comment={comment} state={state} dispatch={dispatch} localData={localData}/>
           <DeleteEditReplyButtons comment={comment} state={state} dispatch={dispatch} localData={localData}/>
         
        
        
       </div>

       {state.replyId === comment.id ? 
        <ReplySection 
          state={state}
          dispatch={dispatch}
          comment={comment}
          localData={localData}
        />:
        ""}

        {comment.replies ? <Replies 
        comment={comment} 
        state={state} 
        dispatch={dispatch}
        localData={localData}
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
