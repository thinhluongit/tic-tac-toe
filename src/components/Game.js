import { useState } from "react";
import { calculateWinner } from "./helper";
import "./GameStyle.css";
import Board from "./Board";
import { Switch } from "antd";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //   const [xIsNext, setXIsNext] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [sort, setSort] = useState(true);

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const winner = calculateWinner(currentSquares);
  //   const winner = winnerInfo[0];

  const handleClick = (i) => {
    if (winner || currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    if (move === currentMove) {
      return <li key={move}>You are at move #{move}</li>;
    } else {
      let description = move > 0 ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game-container">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onClick={(i) => handleClick(i)}
          //   winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div className="info">{status}</div>
        <div>
          <Switch
            className="switch"
            checkedChildren="Ascending"
            unCheckedChildren="Descending"
            defaultChecked
            onClick={() => setSort(!sort)}
          />
        </div>
        <br />
        <ol>{sort ? moves : new Array(Array.from(moves).reverse())}</ol>
      </div>
    </div>
  );
};

export default Game;
