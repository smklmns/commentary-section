import React from 'react'
import {upvoteFunction, downvoteFunction} from '../UpvoteDownvoteLogic'

const ScoreSection = ({state, dispatch, reply, localData}) => {

  return (
    <div className='scoreBox'>
            <button type='button' onClick={() => upvoteFunction(state, dispatch, reply, localData)}>
              <img src="../interactive-comments-section-main/images/icon-plus.svg" alt="up" />
            </button>
            <p>{reply.score}</p>
            <button type='button' onClick={() => downvoteFunction(state, dispatch, reply, localData)}>
              <img src="../interactive-comments-section-main/images/icon-minus.svg" alt="down" />
            </button>
     </div>
  )
}

export default ScoreSection