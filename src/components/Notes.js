import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let newNote = {
        id: '',
        title: '',
        description: '',
        tag: ''
    };
    const [note, setNote] = useState(newNote);
    const editNoteRef = useRef(null);
    const closeEditModalRef = useRef(null);
    const nav = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        if (authToken) {
            getNotes();
        } else {
            nav('/login');
        }

        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        editNoteRef.current.click();
        setNote(currentNote);
    }
    // On fields update
    const fieldUpdate = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    // On click save update note
    const saveUpdatedNote = async (e) => {
        e.preventDefault();
        await editNote(note._id, note.title, note.description, note.tag);
        closeEditModalRef.current.click();
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal" ref={editNoteRef}>
                Launch demo modal
            </button>
            <div className="modal fade" id="editNoteModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="close btn" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={fieldUpdate} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" rows="3" name="description" onChange={fieldUpdate} value={note.description}
                                        minLength={5} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={fieldUpdate} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeEditModalRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 3 || note.description.length < 5} type="button" className="btn btn-primary" onClick={saveUpdatedNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NotesItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>

        </>
    )
}

export default Notes