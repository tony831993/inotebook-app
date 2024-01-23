import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    
    const onDeleteNote = (id) => {
        deleteNote(id);
    };
    const { note } = props;
    return (
        <div className='col-md-4'>
            <div className="card text-bg-light mb-3">
                <div className="card-header">
                    {note.title}
                    <span className="note-actions float-end">
                        <i className="fa-solid fa-trash-arrow-up mx-2" onClick={() => onDeleteNote(note._id)}></i>
                        <i className="fa-solid fa-pencil mx-2"></i>
                    </span>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
            </div>


        </div>
    )
}

export default NotesItem