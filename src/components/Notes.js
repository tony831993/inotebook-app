import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NotesItem key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes