import React, { useState } from "react";
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import "./Board.css";

//Pieces
import kingWhite from "../../assets/pieces/white-king.svg";
import kingBlack from "../../assets/pieces/black-king.svg";
import queenWhite from "../../assets/pieces/white-queen.svg";
import queenBlack from "../../assets/pieces/black-queen.svg";
import rookWhite from "../../assets/pieces/white-rook.svg";
import rookBlack from "../../assets/pieces/black-rook.svg";
import bishopWhite from "../../assets/pieces/white-bishop.svg";
import bishopBlack from "../../assets/pieces/black-bishop.svg";
import knightWhite from "../../assets/pieces/white-knight.svg";
import knightBlack from "../../assets/pieces/black-knight.svg";
import whitePawn from "../../assets/pieces/white-pawn.svg";
import blackPawn from "../../assets/pieces/black-pawn.svg";

let temp = [];
let initialBoard = [];
let lookupTable = {};

for (var i = 1; i <= 8; i++) {
  for (var j = 1; j <= 8; j++) {
    temp.push({
      id: { i, j },
      name: `${String.fromCharCode(96 + j)}${i}`,
      color: (i + j) % 2 == 0 ? "bg-gray-600" : "bg-white",
      occupiedBy: "",
    });

    // Create the Lookup table
    // if (`${String.fromCharCode(96 + i)}${j}`[1] == "2") {
    //   lookupTable[`${String.fromCharCode(96 + i)}${j}`] = whitePawn;
    // } else if (`${String.fromCharCode(96 + i)}${j}`[1] == "7") {
    //   lookupTable[`${String.fromCharCode(96 + i)}${j}`] = blackPawn;
    // } else {
    //   lookupTable[`${String.fromCharCode(96 + i)}${j}`] = "";
    // }

    lookupTable[`${String.fromCharCode(96 + i)}${j}`] = { name: "", url: "" };
    lookupTable["e1"] = {
      name: "king-white",
      imageUrl: kingWhite,
    };
  }
}

for (var i = 63; i >= 0; i -= 8) {
  initialBoard.push(temp.slice(i - 7, i + 1));
}
initialBoard = [].concat(...initialBoard);

const Board = () => {
  const [board, setBoard] = useState(initialBoard);

  console.log(lookupTable);

  return (
    <div className="board">
      {initialBoard.map((square) => (
        <Square
          key={square.name}
          id={square.id}
          name={square.name}
          color={square.color}
          occupiedBy={square.occupiedBy}
        >
          {lookupTable[square.name].name.length == 0 ? null : (
            <Piece image={lookupTable[square.name].imageUrl} />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
