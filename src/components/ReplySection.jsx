import React from 'react'

const ReplySection = ({state, dispatch, comment, reply, localData}) => {

  const createReply = () => {
    let id = Math.random()
  let idCheck = localData.comments.map(comment => comment.id === id ? false : true)
  if(idCheck === false) id++

  let theCommentOfReply = comment.user.username
  let nameOfTheUser = reply ? reply.user.username : null
 

  let dateOfPost = new Date()
  const newReply = {
    id: id,
    content: state.reply,
    createdAt: dateOfPost,
    score: 0,
    replyingTo: nameOfTheUser ? nameOfTheUser : theCommentOfReply,
    user: {
      image: {
        png: state.currentUser.image.png,
        webp: state.currentUser.image.webp
      },
      replies: [],
    username: state.currentUser.username
    }
  }
   
    comment.replies.push(newReply)
    localStorage.setItem('data', JSON.stringify(localData))
    dispatch({type: 'replyId', setReplyId: -3})
    dispatch({type: 'setChecker'})
  }

  return (
    <div className={reply ? 'replyOfReplySection' : 'replySection'}>
      <img src={state.currentUser.image ? state.currentUser.image.png: ""} alt="Profile-picture" />
      <textarea 
        onChange={(e) => {
          dispatch({type: 'setReply', setReply: e.target.value})
        }}  
        name="form" id="" rows="4" placeholder="Add a comment..." required></textarea>
        
      <button onClick={() => {
        createReply()
      }} className='replyB' type="button">REPLY</button>
      
     
    </div>
  )
}

export default ReplySection