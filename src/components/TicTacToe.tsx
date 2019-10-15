import React, { FC, memo, useRef, useCallback, useReducer } from 'react'
import '../index.css'

interface SquareProps{
  index: number
  value: number | string | null
  selected: boolean
  onClick: (i: number) => void
}

const Square = memo<SquareProps>(({index, value, onClick, selected}) => {
  const renders = useRef<number>(0);
  console.log("renders at index: " + index, ++renders.current)
    return (
      <button className={`square${selected ? " red" : ""}`} onClick={() => onClick(index)}>
        {value}
      </button>
    );
})

const defaultState =   {
  squares: Array(9).fill(''),
  sqSelected: Array(9).fill(false),
  xIsNext: true,
}

const reducer = (state: any, action: {type: string, payload: any}) => {
  let tSquares = [...state.squares]
  let tSqSelected = [...state.sqSelected]
  switch(action.type){
    case 'handleClick':
        if(calculateWinner(tSquares) || tSquares[action.payload.idx]) return state
        tSquares[action.payload.idx] = state.xIsNext ? 'X' : 'O'
        tSqSelected[action.payload.idx] = true
        return {
            squares: tSquares,
            sqSelected: tSqSelected,
            xIsNext: !state.xIsNext
        }
    case 'clear':
      return defaultState
    default:
      return state;
  }
}

const Board: FC = () => {
  const [{squares, sqSelected, xIsNext}, dispatch] = useReducer(reducer, defaultState)
  const renderSquare = (i: number) => <Square key={i} index={i} value={squares[i]} selected={sqSelected[i]} onClick={handleClick}/>

  const handleClick = useCallback(
    (i: number) => {
      dispatch({type: 'handleClick', payload: {idx: i}})
    },
    [dispatch]
  )

  const clearTicTacToe = () => {
    dispatch({type: 'clear', payload: null})
  }

  const winner = calculateWinner(squares)

  let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')
  let rows = [[0,1,2],[3,4,5],[6,7,8]]

  const generateRows = () => {
    return rows.map((numArr, idx) => {
      return (
        <div key={idx} className="board-row">
          {/* {numArr.map((num, i) => <React.Fragment key={i}>{renderSquare(num)}</React.Fragment>)} */}
          {numArr.map((num, i) => <Square key={i} index={num} value={squares[num]} selected={sqSelected[num]} onClick={handleClick}/>)}
          
        </div>
      )
    })
  }
  
    return (
      <>
        <div className="status">{status}</div>
        {generateRows()}
        <button onClick={clearTicTacToe}>Reset</button>
      </>
    );
}

const Game: FC = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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