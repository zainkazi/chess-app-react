import React, { useEffect, useState } from "react";
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import initializeBoard from "../../services/initializeBoard";
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

const { initialBoard, boardState } = initializeBoard();

boardState["e1"] = {
  name: "king-white",
  imageUrl: kingWhite,
};

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
