import { useState , useRef } from "react";

export default function Player() {
  const playerName = useRef()

  const [enteredPlayerName, setEnteredPlayerName] = useState("")

  function handleClick() {
    // All ref values must access value through this current property
    setEnteredPlayerName(playerName.current.value)
  }
  // Special JS syntax "??"
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
