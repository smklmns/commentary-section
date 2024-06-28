import React from 'react'
import dateFunc from '../../dateFunc'

const ContentSection = ({state, dispatch, comment, reply}) => {

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
  )
}

export default ContentSection