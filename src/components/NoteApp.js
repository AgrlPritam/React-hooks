import React, {useEffect,useState,useReducer} from 'react'
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import NotesContext from '../context/Notes-Context';

const NoteApp =() => {
    //const [notes, setNotes] = useState([])
    const [notes, dispatch] = useReducer(notesReducer, [])

    //Commented below as we use context
    // const removeNote = (title) => {
    //   dispatch({
    //     type:'REMOVE_NOTE',
    //     title
    //   })
      //setNotes(notes.filter((note) => note.title !== title))
  
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
      <NotesContext.Provider value={{notes, dispatch}} >
        <h1>Notes</h1>
        <NoteList />
        <AddNoteForm />
      </NotesContext.Provider>
    )
}

export {NoteApp as default}