import React, { useEffect, useState } from "react";
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

//Grey dot
import dot from "../../assets/misc/grey-dot.png";

let temp = [];
let initialBoard = [];
let boardState = {};
// let possibleMoves = {
//   // king method returns true if the destination square is the possible move from the current square
//   king: (currentSquare, destinationSquare) =>
//     [-1, 0, 1].includes(
//       destinationSquare[0].charCodeAt(0) - currentSquare[0].charCodeAt(0)
//     ) &&
//     [-1, 0, 1].includes(destinationSquare[1] - currentSquare[1]) &&
//     !(
//       destinationSquare[0].charCodeAt(0) - currentSquare[0].charCodeAt(0) ==
//         0 && destinationSquare[1] - currentSquare[0] == 0
//     ),
// };

// These are the functions for finding the possible moves for all the pieces
let possibleMovesFunctions = {
  king: (currentSquare) =>
    Object.keys(boardState).filter(
      (destinationSquare) =>
        [-1, 0, 1].includes(
          destinationSquare[0].charCodeAt(0) - currentSquare[0].charCodeAt(0)
        ) &&
        [-1, 0, 1].includes(destinationSquare[1] - currentSquare[1]) &&
        !(
          destinationSquare[0].charCodeAt(0) - currentSquare[0].charCodeAt(0) ==
            0 && destinationSquare[1] - currentSquare[1] == 0
        )
    ),
};

// Inititalizing the empty board and board state
for (var i = 1; i <= 8; i++) {
  for (var j = 1; j <= 8; j++) {
    temp.push({
      //id: { j, i },
      name: `${String.fromCharCode(96 + j)}${i}`,
      color: (i + j) % 2 == 0 ? "bg-gray-600" : "bg-white",
    });

    // Create the Lookup table
    // if (`${String.fromCharCode(96 + i)}${j}`[1] == "2") {
    //   boardState[`${String.fromCharCode(96 + i)}${j}`] = whitePawn;
    // } else if (`${String.fromCharCode(96 + i)}${j}`[1] == "7") {
    //   boardState[`${String.fromCharCode(96 + i)}${j}`] = blackPawn;
    // } else {
    //   boardState[`${String.fromCharCode(96 + i)}${j}`] = "";
    // }

    boardState[`${String.fromCharCode(96 + i)}${j}`] = {
      name: "",
      imageUrl: "",
    };
    boardState["e1"] = {
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
  const [lookupTable, setLookupTable] = useState(boardState);
  const [pieceMovementFlag, setPieceMovementFlag] = useState(false);
  const [currentClickedSquareAndPiece, setCurrentClickedSquareAndPiece] =
    useState({ square: "", piece: "", moves: [] });

  useEffect(() => {
    console.log(currentClickedSquareAndPiece);
    console.log(pieceMovementFlag);
  }, [pieceMovementFlag, currentClickedSquareAndPiece]);

  const movePiece = (currentSquare, destinationSquare) => {
    const piece = lookupTable[currentSquare].name.split("-")[0];

    if (piece == "king") {
      if (
        possibleMovesFunctions.king(currentSquare).includes(destinationSquare)
      ) {
        setLookupTable({
          ...lookupTable,
          [destinationSquare]: lookupTable[currentSquare],
          [currentSquare]: { name: "", imageUrl: "" },
        });
      }
    }
  };

  // Moving the piece using click
  const handleClick = (name) => {
    let piece = lookupTable[name].name;
    console.log(piece);

    if (!pieceMovementFlag) {
      if (piece.length == 0) {
        return;
      } else {
        piece = piece.split("-")[0];

        if (piece == "king") {
          const possibleMoves = possibleMovesFunctions.king(name);
          setCurrentClickedSquareAndPiece(() => ({
            square: name,
            piece: piece,
            moves: possibleMoves,
          }));
        }
        setPieceMovementFlag(true);
      }
    } else if (pieceMovementFlag) {
      if (piece.length == 0) {
        if (currentClickedSquareAndPiece.moves.includes(name)) {
          movePiece(currentClickedSquareAndPiece.square, name);
        }
      }
      setCurrentClickedSquareAndPiece({ square: "", piece: "", moves: [] });
      setPieceMovementFlag(false);
    }
  };

  return (
    <div className="board">
      {board.map((square) => (
        <Square
          onSquareClick={handleClick}
          key={square.name}
          name={square.name}
          color={square.color}
        >
          {lookupTable[square.name].name.length == 0 ? null : (
            <Piece
              location={square.name}
              image={lookupTable[square.name].imageUrl}
            />
          )}

          {currentClickedSquareAndPiece.moves.includes(square.name) && (
            <img src={dot} />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
