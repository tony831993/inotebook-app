import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    let newNote = {
        title: '',
        description: '',
        tag: ''
    }
    const [note, setNote] = useState(newNote);

    const onFormSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const fieldUpdate = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add new note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={fieldUpdate} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" name="description" onChange={fieldUpdate}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={fieldUpdate} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" onClick={onFormSubmit}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote