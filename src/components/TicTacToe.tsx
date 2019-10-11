import React, { FC, useState } from 'react'
import '../index.css'

interface SquareProps{
  value: number | string | null
  onClick: (e: React.MouseEvent) => void
}

const Square: FC<SquareProps> = ({value, onClick}) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
}

const Board: FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''))
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const renderSquare = (i: number) => <Square value={squares[i]} onClick={() => handleClick(i)}/>

  const handleClick = (i: number) => {
    const tSquares = squares.slice()
    if(calculateWinner(tSquares) || tSquares[i]) return
    tSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(tSquares)
    setXIsNext(!xIsNext)
  };

  const winner = calculateWinner(squares)

  let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')
  let rows = [[0,1,2],[3,4,5],[6,7,8]]

  const generateRows = () => {
    return rows.map((numArr, idx) => {
      return (
        <div key={idx} className="board-row">
          {numArr.map(num => <>{renderSquare(num)}</>)}
        </div>
      )
    })
  }
  
    return (
      <div>
        <div className="status">{status}</div>
        {generateRows()}
      </div>
    );
}

const Game: FC = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game