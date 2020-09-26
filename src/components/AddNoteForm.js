import React,{useState, useContext} from 'react';
import NotesContext from '../context/Notes-Context';

const AddNoteForm = () => {
    const {dispatch} = useContext(NotesContext)
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
    return (
        <div>
            <p>Add Note</p>
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                <button>Add Note</button>
            </form>
        </div>
    )
}

export {AddNoteForm as default}
