import { useEffect, useState } from 'react'
import './App.css'

enum CharType {
  Dash = '-',
  Ex = 'X',
  Ou = 'O'
}

type TableRow = [CharType, CharType, CharType];
type Table = [TableRow, TableRow, TableRow];
type Player = CharType.Ex | CharType.Ou | null;

type Game = {
  table: Table,
  gameOver: boolean;
  winner: Player;
  playing: CharType.Ex | CharType.Ou;
};

const initialTable: Table = [
  [CharType.Dash, CharType.Dash, CharType.Dash],
  [CharType.Dash, CharType.Dash, CharType.Dash],
  [CharType.Dash, CharType.Dash, CharType.Dash],
];

const initialGame: Game = {
  table: initialTable,
  gameOver: false,
  winner: null,
  playing: CharType.Ex,
};

function App() {
  const [game, setGame] = useState<Game>(initialGame);

  const handleClickCell = (rowIndex: number, cellIndex: number) => {
    // which player it is
    const {playing, table} = game;
    const nextPlayer =  playing === CharType.Ex? CharType.Ou: CharType.Ex;

    // move
    const updatedTable = table.map(row => [...row]) as Table;
    updatedTable[rowIndex][cellIndex] = playing;

    // check if he won!
    const userHasWon = hasWon(updatedTable);
    // check if there are no more spaces
    const hasSpace = updatedTable.some(tableRow => tableRow.find(item => item === CharType.Dash));
    const isGameOver = userHasWon || !hasSpace;

    // update
    setGame(prevGame => ({
      ...prevGame,
      playing: nextPlayer,
      gameOver: isGameOver,
      table: updatedTable,
      winner: userHasWon? playing: null
    }));
  };

  const hasWon = (table: Table) => {
    const a = table[0][0] === table[0][1] && table[0][0] === table[0][2] && table[0][2] !== CharType.Dash;
    const b = table[1][0] === table[1][1] && table[1][0] === table[1][2] && table[1][2] !== CharType.Dash;
    const c = table[2][0] === table[2][1] && table[2][0] === table[2][2] && table[2][2] !== CharType.Dash;
    const d = table[0][0] === table[1][0] && table[0][0] === table[2][0] && table[2][0] !== CharType.Dash;
    const e = table[0][1] === table[1][1] && table[0][1] === table[2][1] && table[2][1] !== CharType.Dash;
    const f = table[0][2] === table[1][2] && table[0][2] === table[2][2] && table[2][2] !== CharType.Dash;
    const g = table[0][0] === table[1][1] && table[0][0] === table[2][2] && table[2][2] !== CharType.Dash;
    const h = table[0][2] === table[1][1] && table[0][2] === table[2][0] && table[2][0] !== CharType.Dash;
    return a || b || c || d || e || f || g || h;
  };

  const handleResetGame = () => {
    setGame(initialGame);
  }

  const {table, gameOver, winner} = game;

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className='table'>
        {
          table.map((row, rowIndex) => {
            return row.map((cell, cellIndex) =>
              <button disabled={game.gameOver || cell !== CharType.Dash} key={`${rowIndex}-${cellIndex}`} className={`cell cell-${cell}`} onClick={() => handleClickCell(rowIndex, cellIndex)}>
                {cell}
              </button>
            )
          })
        }
      </div>
      {gameOver && (
        <div>
          <h2>Game is over!</h2>
          <p>{winner && `User ${winner} has won!!!!`}</p>
          <p>{gameOver && !winner && 'Game is over, nobody has won, please try again!'}</p>
        </div>
      )}
      <button onClick={handleResetGame}>Clear Board</button>
    </>
  )
}

export default App
