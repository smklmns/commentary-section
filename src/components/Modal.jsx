import React from 'react'

const Modal = ({state, dispatch}) => {

  return (
    <div className='modalScreen'>
      <div className='modal'>
        <h2 >Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <button className='no' type='button'
          onClick={() => {
            dispatch({type: 'setDeleteComment', setDeleteComment: null})
          }}
        >NO, CANCEL</button>
        <button className='yes' type='button'
          onClick={() => {       
           state.deleteComment()
          }}
        >YES, DELETE</button>
      </div>
    </div>
  )
}

export default Modal
