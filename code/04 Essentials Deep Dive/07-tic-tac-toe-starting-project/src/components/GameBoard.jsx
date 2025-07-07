export default function GameBoard({ onSelectSquare, turns, board }){    
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)
    
    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         // Objects must be updated in an immutable way
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard
    //     })

    //     onSelectSquare()
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                        disabled={playerSymbol !== null}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}            
        </ol>
    )
}