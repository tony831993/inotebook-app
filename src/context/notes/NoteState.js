import { useState } from "react";
import NoteContext from "./noteContext";

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

    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;