import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card text-bg-light mb-3">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{'left': '95%'}}>
                    {note.tag}
                </span>
                <div className="card-header">
                    {note.title}
                    <span className="note-actions float-end">
                        <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pencil mx-2" onClick={() => updateNote(note)}></i>
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