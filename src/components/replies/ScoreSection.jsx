import React from 'react'

const ScoreSection = ({state, dispatch, comment, reply}) => {

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

  return (
    <div className='scoreBox'>
            <button type='button' onClick={() => upvoteScore(reply)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
            </button>
            <p>{reply.score}</p>
            <button type='button' onClick={() => downvoteScore(reply)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
            </button>
     </div>
  )
}

export default ScoreSection