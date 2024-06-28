import React from 'react'

const DeleteEditReplyButtons = ({state, dispatch, comment, reply}) => {
  return (
    <>
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
    </>
  )
}

export default DeleteEditReplyButtons