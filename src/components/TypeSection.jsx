import React from 'react'

const TypeSection = ({state, dispatch}) => {

  
  return (
    <div className='typeSection'>
      <img src={state.currentUser.image ? state.currentUser.image.png: ""} alt="Profile-picture" />
      <textarea 
        value={state.textArea}
        onChange={(e) => {
           dispatch({type: 'setTextArea', setTextArea: e.target.value})
        }}
        name="form" id="" rows="4" placeholder="Add a comment..." required></textarea>
      <button className='submitB' type="submit">SEND</button>
    </div>
  )
}

export default TypeSection