import React from 'react'
import Note from './note'

const NoteList = ({notes, removeNote}) => {
    return notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
    ))
}

export {NoteList as default}