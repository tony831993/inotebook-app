import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const s1 = {
  //     "name": "Tanmay",
  //     "class": '8C'
  // };
  // const [state, setState] = useState(s1);
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "Harry",
  //             "class": "9A"
  //         })
  //     }, 2000);
  // }
  // return (
  //     <NoteContext.Provider value={{ state: state, update: update }}>
  //         {props.children}
  //     </NoteContext.Provider>
  // );

  const notesInitital = [
    {
      "_id": "65adfe580239841ea13d1adb",
      "user": "65aa5b9abc17e8c5598b4e9b",
      "title": "Jai Shri Ram",
      "description": "Ayodhya Mandir - Jai Shri Ram",
      "tag": "Special",
      "timestamp": "2024-01-22T05:34:16.608Z",
      "__v": 0
    },
    {
      "_id": "65ae3e2112a749375ea7ab03",
      "user": "65aa5b9abc17e8c5598b4e9b",
      "title": "My Title",
      "description": "My description for note",
      "tag": "General",
      "timestamp": "2024-01-22T10:06:25.909Z",
      "__v": 0
    },
    {
      "_id": "65ae3e88efde230003745fdf",
      "user": "65aa5b9abc17e8c5598b4e9b",
      "title": "My Title",
      "description": "My description for note",
      "tag": "General",
      "timestamp": "2024-01-22T10:08:08.132Z",
      "__v": 0
    }
  ];
  const [notes, setNotes] = useState(notesInitital);
  const addNote = (title, description, tag) => {
    let note = {
      "_id": "65ae3e88efde230003745fdf",
      "user": "65aa5b9abc17e8c5598b4e9b",
      "title": title,
      "description": description,
      "tag": tag,
      "timestamp": "2024-01-22T10:08:08.132Z",
      "__v": 0
    };

    setNotes(notes.concat(note));
  };
  const editNote = () => {

  };
  const deleteNote = () => {

  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;