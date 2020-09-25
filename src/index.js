import React,{ useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const notesReducer = (state, action) => {
  switch(action.type){
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [
        ...state,
        { title: action.title, body: action.body }
      ]
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title)
    default:
      return state
  }
}

const NoteApp =() => {
  //const [notes, setNotes] = useState([])
  const [notes, dispatch] = useReducer(notesReducer, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const addNote = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_NOTE',
      title,
      body
    })
    // setNotes([
    //   ...notes,
    //   { title, body }
    // ])
    setTitle('')
    setBody('')
  }
  const removeNote = (title) => {
    dispatch({
      type:'REMOVE_NOTE',
      title
    })
    //setNotes(notes.filter((note) => note.title !== title))
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))
    if(notes) {
      dispatch({type: 'POPULATE_NOTES', notes})
      //setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add Note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>Add Note</button>
      </form>
    </div>
  )
}

const Note = ({note, removeNote}) => {
  useEffect(() => {
    console.log('Setting up effect!');
    //For cleaning the useEffect dependencies we create a function inside this useEffect function
    return () => {
      console.log('Cleaning up effect');
    }
  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <h5>{note.body}</h5>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

// const App = (props) => {
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState('Set')
//   useEffect(() => {
//     console.log('This will only run once!');
//   }, [])
//   useEffect(() => {
//     console.log('useEffect ran');
//     document.title = 'Count ' + count
//   }, [count])

//   return (
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count+1)}>+1</button>
//       <button onClick={() => setCount(count-1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>Reset</button>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//     </div>
//   )
// }

// App.defaultProps = {
//   count: 0
// }


ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
