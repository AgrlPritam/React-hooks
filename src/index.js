import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp =() => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const addNote = (e) => {
    e.preventDefault()
    setNotes([
      ...notes,
      { title, body }
    ])
    setTitle('')
    setBody('')
  }
  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title))
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'))
    if(notesData) {
      setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <h5>{note.body}</h5>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
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


const App = (props) => {
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState('Set')
  useEffect(() => {
    console.log('This will only run once!');
  }, [])
  useEffect(() => {
    console.log('useEffect ran');
    document.title = 'Count ' + count
  }, [count])

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count+1)}>+1</button>
      <button onClick={() => setCount(count-1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

App.defaultProps = {
  count: 0
}


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
