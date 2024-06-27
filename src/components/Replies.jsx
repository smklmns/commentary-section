import React from 'react'
import dateFunc from '../dateFunc'

import ReplySection from './ReplySection'

const Replies = ({comment, state, dispatch}) => {

  const upvoteScore = (reply) => {
    let user = state.currentUser.username
 
   if(!reply.liked) {
     let liked = {}
     liked[user] = 1


     let commentIndex = state.currentComments.indexOf(comment)
     let replyIndex = comment.replies.indexOf(reply)
     let data = JSON.parse(localStorage.getItem('data'))
     data.comments[commentIndex].replies[replyIndex].score++

     data.comments[commentIndex].replies[replyIndex].liked = liked
     localStorage.setItem('data', JSON.stringify(data))
     dispatch({type: 'setChecker'})
   } else if(reply.liked[user] === 0 || reply.liked[user] === -1) {
     reply.liked[user]++
     let commentIndex = state.currentComments.indexOf(comment)
     let replyIndex = comment.replies.indexOf(reply)
     let data = JSON.parse(localStorage.getItem('data'))
     data.comments[commentIndex].replies[replyIndex].score++
     data.comments[commentIndex].replies[replyIndex].liked = reply.liked
     localStorage.setItem('data', JSON.stringify(data))
     dispatch({type: 'setChecker'})
   }
 }

 const downvoteScore = (reply) => {
   let user = state.currentUser.username
   
   if(!reply.liked) {
     let liked = {}
     liked[user] = -1


     let commentIndex = state.currentComments.indexOf(comment)
     let replyIndex = comment.replies.indexOf(reply)
     let data = JSON.parse(localStorage.getItem('data'))
     data.comments[commentIndex].replies[replyIndex].score--
     data.comments[commentIndex].replies[replyIndex].liked = liked
     localStorage.setItem('data', JSON.stringify(data))
     dispatch({type: 'setChecker'})
   } else if(reply.liked[user] === 0 || reply.liked[user] === 1) {
     reply.liked[user]--

     let commentIndex = state.currentComments.indexOf(comment)
     let replyIndex = comment.replies.indexOf(reply)
     let data = JSON.parse(localStorage.getItem('data'))
     data.comments[commentIndex].replies[replyIndex].score--
     data.comments[commentIndex].replies[replyIndex].liked = reply.liked
     localStorage.setItem('data', JSON.stringify(data))
     dispatch({type: 'setChecker'})
   }
   
 }


const editFunc = (comment, reply ) => {
  if(state.editedComment){ 
     let replyIndex = comment.replies.indexOf(reply)
     let index = state.currentComments.indexOf(comment)
  let data = JSON.parse(localStorage.getItem('data'))
  data.comments[index].replies[replyIndex].content = state.editedComment
  localStorage.setItem('data', JSON.stringify(data))
  dispatch({type: 'setId', setId: -10}) 
  dispatch({type: 'setChecker'})
  } else {
    dispatch({type: 'setId', setId: -10})
  }

  }

  return (
    <div className='theBiggestReplyBox'>
    {comment.replies.map(reply => {
      return (
        <div key={reply.id} className="boxOfReplyBox">
        <div  className='replyBox'>

        
            <div className='scoreBox'>
            <button type='button' onClick={() => upvoteScore(reply)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
            </button>
            <p>{reply.score}</p>
            <button type='button' onClick={() => downvoteScore(reply)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
            </button>
            </div>
       

        <div className="contentSection">

          <div className='profileBox'>
            <img src={reply.user.image.png} alt="profile-picture" />
            <p className='userName'>{reply.user.username}</p>
            {reply.user.username === state.currentUser.username ? 
              <div className="you">
                <p>you</p>
              </div>
              :
              ""
             }
            <p className="date">{dateFunc(reply.createdAt)}</p>
          </div>


          {reply.id === state.id ? <div className="editCommentSection"><textarea id="editArea" rows="4" onChange={(e) => {dispatch({type: 'setEditedComment', setEditedComment: e.target.value})}} defaultValue={reply.content}></textarea>
             <button className='updateB' type='button' onClick={() => editFunc(comment, reply)}>UPDATE</button>
             </div>
             :
             <p className='comment'>
            <strong>@{reply.replyingTo}</strong> {reply.content}
            </p>
             }
          
        </div>

        
          {reply.user.username === state.currentUser.username ? 
          <div className='deleteEditButtonSection'>
            <button type='button' className='deleteButton' onClick={() => {
              dispatch({type: 'setDeleteCommentId', setDeleteCommentId: reply.id})
              dispatch({type: 'setDeleteReplyToComment', setDeleteReplyToComment: comment})
            }}>
              <img src="../interactive-comments-section-main/images/icon-delete.svg" alt="deleteIcon" />
              <p className='delete'>Delete</p>
            </button>
            <button type='button' className="editButton" onClick={() => {
              dispatch({type: 'setEditedComment', setEditedComment: ''})
              dispatch({type: 'setId', setId: reply.id}) 
            }}>
              <img src="../interactive-comments-section-main/images/icon-edit.svg" alt="editIcon" />
              <p className="edit">Edit</p>
            </button>
          </div>
          :
          <div className='replyButtonSection'>
            <button type='button' className='replyButton' 
            onClick={() => {
              dispatch({type: 'replyId', setReplyId: reply.id})
             
            } }>            
              <img src="../interactive-comments-section-main/images/icon-reply.svg" alt="replyIcon" />
              <p>Reply</p>
          </button>
            </div>
          }
          

          

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