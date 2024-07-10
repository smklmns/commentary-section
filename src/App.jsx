import {useEffect, useReducer} from 'react'
import data from '../data/data.json'
import Comments from './components/comments/Comments'
import TypeSection from './components/TypeSection'
import Modal from './components/Modal'

const reducer = (state, action) => {
  switch(action.type) {
     case 'setCurrentUser': {
      return {...state, currentUser: action.setCurrentUser};
     }
    case 'setTextArea' : {
      return {...state, textArea: action.setTextArea}
    }
    case 'setChecker' : {
      return {...state, checker: !state.checker}
    }

    case 'setEditId' : {
      return {...state, editId: action.setEditId}
    }
    case 'setEditedComment' : {
      return {...state, editedComment: action.setEditedComment}
    }

    case 'replyId' : {
      return {...state, replyId: action.setReplyId}
    }
    case 'setReply': {
      return {...state, reply: action.setReply}
    }

    case 'setDeleteComment': {
      return {...state, deleteComment: action.setDeleteComment}
    }
  }
}

const App = () => {
const [state, dispatch] = useReducer(reducer, 
{   currentUser: data.currentUser, 

    textArea: "", 
    checker: false,
  
    editId: -10,
    editedComment: "",

    replyId: -3,
    reply: "",

    deleteComment: null
})

const saveSetData = () => {
  let localData = JSON.parse(localStorage.getItem('data'))

  if(!localData) {
    localStorage.setItem('data', JSON.stringify(data))
    } else {
    const sort = (arr) => {
      let swapped
  
      do {
        swapped = false
        for(let i = 0; i < arr.length - 1; i++) {
          if(arr[i].score < arr[i + 1].score) {
            
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true
          }
        }
      } while(swapped)
        return arr

  }

    sort(localData.comments)
    
    localStorage.setItem('data', JSON.stringify(localData))
}
}
saveSetData()

useEffect(() => {
    saveSetData()
}, [])


let localData = JSON.parse(localStorage.getItem('data')) 

const submitComment = (e) => {
  e.preventDefault()

  let id = Math.random()
  let idCheck = localData.comments.map(comment => comment.id === id ? false : true)
  if(idCheck === false) id++

  let dateOfPost = new Date()
  const newPost = {
    id: id,
    content: state.textArea,
    createdAt: dateOfPost,
    score: 0,
    user: {
      image: {
        png: state.currentUser.image.png,
        webp: state.currentUser.image.webp
      },
      replies: [],
    username: localData.currentUser.username
    }
  }

  localData.comments.push(newPost)
  localStorage.setItem('data', JSON.stringify(localData))
  dispatch({type: 'setChecker'})
  dispatch({type: 'setTextArea', setTextArea: ""})
} 

  return (
   <form id='form' onSubmit={submitComment}>

      <Comments state={state} dispatch={dispatch} localData={localData}/>
      <TypeSection state={state} dispatch={dispatch}/>
      {state.deleteComment ? 
      <Modal 
        state={state}
        dispatch={dispatch}
      /> : ""}   

      {/* <button onClick={() => localStorage.removeItem('data')}>DELETE</button> */}

  
   </form >
  
  )
}

export default App

