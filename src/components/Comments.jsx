import React from 'react'
import Replies from './Replies'
import dateFunc from '../dateFunc'
import ReplySection from './ReplySection'

const Comments = ({state, dispatch}) => {

  const upvoteScore = (comment) => {
     let user = state.currentUser.username
  
    if(!comment.liked) {
      let liked = {}
      liked[user] = 1


      let index = state.currentComments.indexOf(comment)
      let data = JSON.parse(localStorage.getItem('data'))
      data.comments[index].score++
      data.comments[index].liked = liked
      localStorage.setItem('data', JSON.stringify(data))
      dispatch({type: 'setChecker'})
    } else if(comment.liked[user] === 0 || comment.liked[user] === -1) {
      comment.liked[user]++
      let index = state.currentComments.indexOf(comment)
      let data = JSON.parse(localStorage.getItem('data'))
      data.comments[index].score++
      data.comments[index].liked = comment.liked
      localStorage.setItem('data', JSON.stringify(data))
      dispatch({type: 'setChecker'})
    }
  }

  const downvoteScore = (comment) => {
    let user = state.currentUser.username
    
    if(!comment.liked) {
      let liked = {}
      liked[user] = -1


      let index = state.currentComments.indexOf(comment)
      let data = JSON.parse(localStorage.getItem('data'))
      data.comments[index].score--
      data.comments[index].liked = liked
      localStorage.setItem('data', JSON.stringify(data))
      dispatch({type: 'setChecker'})
    } else if(comment.liked[user] === 0 || comment.liked[user] === 1) {
      comment.liked[user]--

      let index = state.currentComments.indexOf(comment)
      let data = JSON.parse(localStorage.getItem('data'))
      data.comments[index].score--
      data.comments[index].liked = comment.liked
      localStorage.setItem('data', JSON.stringify(data))
      dispatch({type: 'setChecker'})
    }
  }

  const editFunc = (comment ) => {
    if(state.editedComment){ 
    let index = state.currentComments.indexOf(comment)
    let data = JSON.parse(localStorage.getItem('data'))
    data.comments[index].content = state.editedComment
    localStorage.setItem('data', JSON.stringify(data))
   
    dispatch({type: 'setId', setId: -10}) 
    dispatch({type: 'setChecker'})
    } else {
      dispatch({type: 'setId', setId: -10})
    }
  }


  return (
    <div>
    {state.currentComments.map((comment) => {
      return (
       <div key={comment.id} className='box'>
    
       <div className='commentBox'>
 
         
           <div className='scoreBox'>
             <button type="button" onClick={(e) => upvoteScore(comment)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
             </button>
              <p>{comment.score}</p>
             <button type='button' onClick={(e) => downvoteScore(comment)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
             </button>
           </div>
         
 
         <div className="contentSection">
 
           <div className='profileBox'>
             <img src={comment.user.image.png} alt="profile-picture" />
             <p className='userName'>{comment.user.username}</p>
             {comment.user.username === state.currentUser.username ? 
              <div className="you">
                <p>you</p>
              </div>
              :
              ""
             }
             <p className="date">{dateFunc(comment.createdAt)}</p>
           </div>
             

             {  comment.id === state.id ? <div className="editCommentSection"><textarea id="editArea" rows="4" onChange={(e) => {dispatch({type: 'setEditedComment', setEditedComment: e.target.value})}} defaultValue={comment.content}></textarea>
             <button className='updateB' type='button' onClick={() => editFunc(comment)}>UPDATE</button>
             
             </div>
             :
             <p className='comment'>
              {comment.content}
            </p>
             }   
         
         </div>
 

        {comment.user.username === state.currentUser.username ? 
        <div className='deleteEditButtonSection'>
        <button type='button' className='deleteButton' onClick={() => dispatch({type: 'setDeleteCommentId', setDeleteCommentId: comment.id})}>
          <img src="../interactive-comments-section-main/images/icon-delete.svg" alt="deleteIcon" />
          <p className='delete'>Delete</p>
        </button>
        <button type="button" className="editButton" onClick={() => {

          dispatch({type: 'setEditedComment', setEditedComment: ''})
          dispatch({type: 'setId', setId: comment.id}) 
         
          }}>
          <img src="../interactive-comments-section-main/images/icon-edit.svg" alt="editIcon" />
          <p className="edit">Edit</p>
        </button>
      </div> 
      :
        <div className='replyButtonSection'>
           <button type='button' className='replyButton' onClick={() => {
            
            dispatch({type: 'replyId', setReplyId: comment.id})
           }}>
             <img src="../interactive-comments-section-main/images/icon-reply.svg" alt="replyIcon" />
             <p>Reply</p>
           </button>
         </div>
        }
        
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
