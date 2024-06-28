import React from 'react'

const ScoreSection = ({comment, state, dispatch}) => {
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

  return (
    <div className='scoreBox'>
             <button type="button" onClick={(e) => upvoteScore(comment)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
             </button>
              <p>{comment.score}</p>
             <button type='button' onClick={(e) => downvoteScore(comment)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
             </button>
    </div>
  )
}

export default ScoreSection