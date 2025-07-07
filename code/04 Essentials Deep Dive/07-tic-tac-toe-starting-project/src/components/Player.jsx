import { useState } from "react";

// My solution
// function Editing({name, isEditing}){
//     if(!isEditing){
//         return (
//             <span className="player-name">{name}</span>
//         );
//     } else {
//         return (
//             <input></input>
//         )
//     }
// }

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)
    // Answer Key
    let editablePlayerName = <span className="player-name">{playerName}</span> 

    function changeToEditing() {
        // Best practice: when updating state, pass a function to your state updating function
        // When explicitly setting the value, state updates are not performed instantly but at some point in the future
        setIsEditing((editing) => !editing)
        
        if(isEditing){
            onChangeName(symbol, playerName)
        }
        
        /*
        setEditing(!isEditing) schedules a state update to true
        */
    }

    function handleNameChange(event){
        setPlayerName(event.target.value)
    }

    if(isEditing){
        editablePlayerName = <input type="text" value={playerName} onChange={handleNameChange}></input>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
              <button onClick={changeToEditing}>{isEditing ? "Save" : "Edit"}</button>
            </span>
        </li>
    );
}