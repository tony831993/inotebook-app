import { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";

const NoteState = (props) => {
  
  const serverHost = process.env.REACT_APP_SERVER_HOST;
  const notesInitital = [];
  const [notes, setNotes] = useState(notesInitital);
  const authToken = localStorage.getItem('token');
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // Get all notes
  const getNotes = async () => {
    try {
      const url = `${serverHost}/api/notes/fetch_all_notes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        }
      });
      const json = await response.json()
      if (json.success) {
        setNotes(json.data)
      } else {
        showAlert(`Unable to fetch notes.`, 'danger');
      }
    } catch (error) {
      console.error(error);
      showAlert(`Error: ${error.massage}`, 'danger');
    }
  }
  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const url = `${serverHost}/api/notes/add_note`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (json.success) {
        let note = json.data;
        setNotes(notes.concat(note));
        showAlert(`Note added successfully.`, 'success');
      } else {
        showAlert(`Unable to add new note.`, 'danger');
      }
    } catch (error) {
      console.error(error);
      showAlert(`Error: ${error.massage}`, 'danger');
    }
  };
  // Update a note by _id
  const editNote = async (id, title, description, tag) => {
    try {
      const url = `${serverHost}/api/notes/update_note/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (json.success) {
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
        showAlert('Note updated successfully.', 'success');
      } else {
        showAlert(`Unable to edit note.`, 'danger');
      }
    } catch (error) {
      console.error(error);
      showAlert(`Error: ${error.massage}`, 'danger');
    }
  };
  // Delete a note by _id
  const deleteNote = async (id) => {
    try {
      const url = `${serverHost}/api/notes/delete_note/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
      });
      const json = await response.json();
      if (json.success) {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        showAlert(`Note delete successfully.`, 'success');
      } else {
        showAlert(`Unable to delete selected note.`, 'danger');
      }
    } catch (error) {
      console.error(error);
      showAlert(`Error: ${error.massage}`, 'danger');
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;