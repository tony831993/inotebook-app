import React from 'react';

const NotesItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-4'>
            <div className="card text-bg-light mb-3">
                <div className="card-header">
                    {note.title}
                    <span className="note-actions float-end">
                        <i className="fa-solid fa-trash-arrow-up mx-2"></i>
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