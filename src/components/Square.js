import React from 'react';
import "./GameStyle.css";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="game-square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;