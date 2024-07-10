export const upvoteFunction = (state, dispatch, comment, localData) => {
  const user = state.currentUser.username
 
    if(!comment.liked) {
      let liked = {}
        liked[user] = 1
        comment.score++
        comment.liked = liked
        localStorage.setItem('data', JSON.stringify(localData))
        dispatch({type: 'setChecker'})
    } else if(comment.liked[user] === 0 || comment.liked[user] === -1) {
      comment.liked[user]++
      comment.score++
      localStorage.setItem('data', JSON.stringify(localData))
      dispatch({type: 'setChecker'})
    }
}

export const downvoteFunction = (state, dispatch, comment, localData) => {
  const user = state.currentUser.username
 
    if(!comment.liked) {
      let liked = {}
        liked[user] = -1
        comment.score--
        comment.liked = liked
        localStorage.setItem('data', JSON.stringify(localData))
        dispatch({type: 'setChecker'})
    } else if(comment.liked[user] === 0 || comment.liked[user] === 1) {
      comment.liked[user]--
      comment.score--
      localStorage.setItem('data', JSON.stringify(localData))
      dispatch({type: 'setChecker'})
    }
}