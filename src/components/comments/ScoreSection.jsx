import React from 'react'
import { upvoteFunction, downvoteFunction } from '../UpvoteDownvoteLogic'

const ScoreSection = ({comment, state, dispatch, localData}) => {


  return (
    <div className='scoreBox'>
             <button type="button" onClick={(e) => upvoteFunction(state, dispatch, comment, localData)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
             </button>
              <p>{comment.score}</p>
             <button type='button' onClick={(e) => downvoteFunction(state, dispatch, comment, localData)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
             </button>
    </div>
  )
}

export default ScoreSection