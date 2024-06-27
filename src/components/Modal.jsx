import React from 'react'

const Modal = ({state, dispatch}) => {

  const deleteComment = (id) => {

    let localData = JSON.parse(localStorage.getItem('data'))
    let localDataFiltered = localData.comments.filter(comment => {
      return comment.id !== id
    })
    localData.comments = localDataFiltered
    localStorage.setItem('data', JSON.stringify(localData))
    dispatch({type: 'setChecker'})
  }

  const deleteReply = (comment, id) => {

    let commentIndex = state.currentComments.indexOf(comment)
    let localData = JSON.parse(localStorage.getItem('data'))
  
    let localDataFiltered = localData.comments[commentIndex].replies.filter(reply => {
      return reply.id !== id
    })
    localData.comments[commentIndex].replies = localDataFiltered
    localStorage.setItem('data', JSON.stringify(localData))
    dispatch({type: 'setChecker'})
  }

  return (
    <div className='modalScreen'>
      <div className='modal'>
        <h2 >Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <button className='no' type='button'
          onClick={() => {
            dispatch({type: 'setDeleteCommentId', setDeleteCommentId: 0})
            dispatch({type: 'setDeleteReplyToComment', setDeleteReplyToComment: null})
            dispatch({type: 'setChecker'})
            
          }}
        >NO, CANCEL</button>
        <button className='yes' type='button'
          onClick={() => {
            state.deleteReplyToComment ? 
            deleteReply(state.deleteReplyToComment, state.deleteCommentId) : 
            deleteComment(state.deleteCommentId);
            dispatch({type: 'setDeleteCommentId', setDeleteCommentId: 0})

          }}
        >YES, DELETE</button>
      </div>
    </div>
  )
}

export default Modal
