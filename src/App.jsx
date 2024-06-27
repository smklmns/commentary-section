import {useEffect, useReducer} from 'react'
import data from '../data/data.json'
import Comments from './components/Comments'
import TypeSection from './components/TypeSection'
import Modal from './components/Modal'

const reducer = (state, action) => {
  switch(action.type) {
     case 'setCurrentUser': {
      return {...state, currentUser: action.setCurrentUser};
     }
    case 'setCurrentComments': {
      return {...state, currentComments: action.setCurrentComments};
    }
    case 'setTextArea' : {
      return {...state, textArea: action.setTextArea}
    }
    case 'setChecker' : {
      return {...state, checker: !state.checker}
    }
    case 'setId' : {
      return {...state, id: action.setId}
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
    case 'setDeleteCommentId': {
      return {...state, deleteCommentId: action.setDeleteCommentId}
    }
    case 'setDeleteReplyToComment': {
      return {...state, deleteReplyToComment: action.setDeleteReplyToComment}
    }
  }
}


const App = () => {
const [state, dispatch] = useReducer(reducer, 
{   currentUser: {}, 
    currentComments: [], 
    textArea: "", 
    checker: false,
  
    id: -10,
    editedComment: "",
    replyId: -3,
    reply: "",
    deleteCommentId: 0,
    deleteReplyToComment: null
})


const submitComment = (e) => {
  e.preventDefault()

  let id = Math.random()
  let idCheck = state.currentComments.map(comment => comment.id === id ? false : true)
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
    username: state.currentUser.username
    }
  }


  let localData = localStorage.getItem('data')

    localData = JSON.parse(localData)
    localData.comments.push(newPost)  
    localStorage.setItem('data', JSON.stringify(localData))
  
  dispatch({type: 'setChecker'})
  dispatch({type: 'setTextArea', setTextArea: ""})
 
}

useEffect(() => {

  let localData = JSON.parse(localStorage.getItem('data'))
  if(!localData) {
    localStorage.setItem('data', JSON.stringify(data))
    dispatch({type: 'setCurrentUser', setCurrentUser: data.currentUser})
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
  
}, [])

useEffect(() => {
  dispatch({type: 'setCurrentUser', setCurrentUser: data.currentUser})
  let localData = localStorage.getItem('data')

    localData = JSON.parse(localData)
   
    dispatch({type: 'setCurrentComments', setCurrentComments: localData.comments})

 }, [state.checker])


  return (
   <form id='form' onSubmit={submitComment}>

      <Comments state={state} dispatch={dispatch}/>
      <TypeSection state={state} dispatch={dispatch}/>
      {state.deleteCommentId ? 
      <Modal 
        state={state}
        dispatch={dispatch}
      /> : ""}

    <button onClick={() => localStorage.removeItem('data')}>Delete</button>
   
 
     
  
   </form >
  
  )
}

export default App

