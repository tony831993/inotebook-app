import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:3100';
  const notesInitital = [];
  const [notes, setNotes] = useState(notesInitital);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetch_all_notes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYWFjZjgwNjA5N2Y2YzBmYjRjY2ZhIn0sImlhdCI6MTcwNTY4NTUxNn0.S5LwgAKc-0Tfh9wElFCvPAHSkDFHlypbAEC-GPI7nMM"
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  // Add a new note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/add_note`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYWFjZjgwNjA5N2Y2YzBmYjRjY2ZhIn0sImlhdCI6MTcwNTY4NTUxNn0.S5LwgAKc-0Tfh9wElFCvPAHSkDFHlypbAEC-GPI7nMM"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    let note = json.response;
    setNotes(notes.concat(note));
  };
  // Update a note by _id
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/update_note/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYWFjZjgwNjA5N2Y2YzBmYjRjY2ZhIn0sImlhdCI6MTcwNTY4NTUxNn0.S5LwgAKc-0Tfh9wElFCvPAHSkDFHlypbAEC-GPI7nMM"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    notes.map((note) => {
      if (note._id == id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    })
  };
  // Delete a note by _id
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/delete_note/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYWFjZjgwNjA5N2Y2YzBmYjRjY2ZhIn0sImlhdCI6MTcwNTY4NTUxNn0.S5LwgAKc-0Tfh9wElFCvPAHSkDFHlypbAEC-GPI7nMM"
      },
    });
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;