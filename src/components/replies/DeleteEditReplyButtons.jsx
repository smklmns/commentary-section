import React from 'react'

const DeleteEditReplyButtons = ({state, dispatch, comment, reply, localData}) => {

  const deleteComment = () => {
    let index = localData.comments.indexOf(comment)
    let filtered = localData.comments[index].replies.filter(rep => rep.id !== reply.id)
    localData.comments[index].replies = filtered
    localStorage.setItem('data', JSON.stringify(localData))
    dispatch({type: 'setDeleteComment', setDeleteComment: null})
    dispatch({type: 'setChecker'})
  }

  return (
    <>
    {reply.user.username === state.currentUser.username ? 
      <div className='deleteEditButtonSection'>
        <button type='button' className='deleteButton' onClick={() => {
          dispatch({type: 'setDeleteComment', setDeleteComment: deleteComment})
        }}>
          <img src="../interactive-comments-section-main/images/icon-delete.svg" alt="deleteIcon" />
          <p className='delete'>Delete</p>
        </button>
        <button type='button' className="editButton" onClick={() => {
          dispatch({type: 'setEditedComment', setEditedComment: ''})
          dispatch({type: 'setEditId', setEditId: reply.id}) 
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