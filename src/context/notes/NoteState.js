import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:3100';
  const notesInitital = [];
  const [notes, setNotes] = useState(notesInitital);

  // Get all notes
  const getNotes = async () => {
    try {
      const url = `${host}/api/notes/fetch_all_notes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYTViOWFiYzE3ZThjNTU5OGI0ZTliIn0sImlhdCI6MTcwNTY2MzM5MX0.VrxmdORd8qMkcO9ZXK9lAzVMHxb51uW_jsTt4EERmeY"
        }
      });
      const json = await response.json()
      if (json) {
        setNotes(json)
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const url = `${host}/api/notes/add_note`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYTViOWFiYzE3ZThjNTU5OGI0ZTliIn0sImlhdCI6MTcwNTY2MzM5MX0.VrxmdORd8qMkcO9ZXK9lAzVMHxb51uW_jsTt4EERmeY"
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (json) {
        let note = json.response;
        setNotes(notes.concat(note));
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Update a note by _id
  const editNote = async (id, title, description, tag) => {
    try {
      const url = `${host}/api/notes/update_note/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYTViOWFiYzE3ZThjNTU5OGI0ZTliIn0sImlhdCI6MTcwNTY2MzM5MX0.VrxmdORd8qMkcO9ZXK9lAzVMHxb51uW_jsTt4EERmeY"
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (json) {
        let newNotes = JSON.parse(JSON.stringify(notes));
        newNotes.map((note) => {
          if (note._id === id) {
            note.title = title;
            note.description = description;
            note.tag = tag;
          }
          return note;
        })
        setNotes(newNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Delete a note by _id
  const deleteNote = async (id) => {
    try {
      const url = `${host}/api/notes/delete_note/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYTViOWFiYzE3ZThjNTU5OGI0ZTliIn0sImlhdCI6MTcwNTY2MzM5MX0.VrxmdORd8qMkcO9ZXK9lAzVMHxb51uW_jsTt4EERmeY"
        },
      });
      const json = await response.json();
      if (json) {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;