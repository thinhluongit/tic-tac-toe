import React from "react";
import Square from "./Square";
import "./GameStyle.css";

const Board=(props) =>{
   
  const renderSquare = (i) => {
    return (
      <div className="game-board">
        <Square
          value={props.squares[i]}
          onSquareClick={() => props.onClick(i)}></Square>
      </div>
    );
  };

  const createBoard = () => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const squares = [];
      for (let col = 0; col < 3; col++) {
        const index = 3 * row + col;
        squares.push(renderSquare(index));
      }
      board.push(
        <div className="board-row" key={row}>
          {squares}
        </div>
      );
    }
    return board;
  };

  return <div>{createBoard()}</div>;
}

export default Board;
