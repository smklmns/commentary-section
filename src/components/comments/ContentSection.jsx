import React from 'react'
import dateFunc from '../../dateFunc'

const ContentSection = ({comment, state, dispatch}) => {

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
  )
}

export default ContentSection