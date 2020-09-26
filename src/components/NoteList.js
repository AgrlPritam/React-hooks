import React,{useContext} from 'react'
import Note from './note'
import NotesContext from '../context/Notes-Context'

const NoteList = () => {
    const {notes} = useContext(NotesContext)
    return notes.map((note) => (
        <Note key={note.title} note={note} />
    ))
}

export {NoteList as default}