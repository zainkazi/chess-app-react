import React from "react";
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import "./Board.css";

//Pieces
import kingBla from "../../assets/pieces/king-black.svg";

let temp = [];
let board = [];

for (var i = 1; i <= 8; i++) {
  for (var j = 1; j <= 8; j++) {
    temp.push({
      id: { i, j },
      name: `${String.fromCharCode(96 + i)}${j}`,
      color: (i + j) % 2 == 0 ? "bg-gray-600" : "bg-white",
      occupudBy: "",
    });
  }
}

for (var i = 63; i >= 0; i -= 8) {
  board.push(temp.slice(i - 7, i + 1));
}
board = [].concat(...board);

const Board = () => {
  console.log(board);

  return (
    <div className="board">
      {board.map((square) => (
        <Square
          key={square.name}
          id={square.id}
          name={square.name}
          color={square.color}
          occupiedBy={square.occupiedBy}
        />
      ))}
    </div>
  );
};

export default Board;
