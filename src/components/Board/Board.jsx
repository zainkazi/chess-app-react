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
import pawnWhite from "../../assets/pieces/white-pawn.svg";
import pawnBlack from "../../assets/pieces/black-pawn.svg";

//Grey dot
import dot from "../../assets/misc/grey-dot.png";

const { initialBoard, boardState } = initializeBoard();

//put the white king on board
boardState["e1"] = {
  name: "king-white",
  imageUrl: kingWhite,
};
boardState["e2"] = {
  name: "pawn-white",
  imageUrl: pawnWhite,
};
boardState["c7"] = {
  name: "pawn-black",
  imageUrl: pawnBlack,
};

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [lookupTable, setLookupTable] = useState(boardState);
  const [pieceMovementFlag, setPieceMovementFlag] = useState(false);
  const [currentClickedSquareAndPiece, setCurrentClickedSquareAndPiece] =
    useState({ square: "", piece: "", moves: [] });

  useEffect(() => {}, [pieceMovementFlag, currentClickedSquareAndPiece]);

  // These are the functions for finding the possible moves for all the pieces
  let possibleMovesFunctions = {
    king: (currentSquare) =>
      Object.keys(lookupTable).filter(
        (destinationSquare) =>
          [-1, 0, 1].includes(
            destinationSquare[0].charCodeAt(0) - currentSquare[0].charCodeAt(0)
          ) &&
          [-1, 0, 1].includes(destinationSquare[1] - currentSquare[1]) &&
          !(
            destinationSquare[0].charCodeAt(0) -
              currentSquare[0].charCodeAt(0) ==
              0 && destinationSquare[1] - currentSquare[1] == 0
          )
      ),

    pawn: (currentSquare, color) => {
      let moves = [];
      if (color == "white") {
        if (currentSquare[1] == "2") {
          moves.push(currentSquare[0] + "3");
          moves.push(currentSquare[0] + "4");
        } else {
          moves.push(
            currentSquare[0] + (parseInt(currentSquare[1]) + 1).toString()
          );
        }
      } else if (color == "black") {
        if (currentSquare[1] == "7") {
          moves.push(currentSquare[0] + "6");
          moves.push(currentSquare[0] + "5");
        } else {
          moves.push(
            currentSquare[0] + (parseInt(currentSquare[1]) - 1).toString()
          );
        }
      }
      return moves;
    },
  };

  // piece from current square to the destination square
  const movePiece = (currentSquare, destinationSquare) => {
    const [piece, color] = lookupTable[currentSquare].name.split("-");

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

    if (piece == "pawn") {
      if (
        possibleMovesFunctions
          .pawn(currentSquare, color)
          .includes(destinationSquare)
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
  const handleClick = (squareName) => {
    let piece = lookupTable[squareName].name;
    let color;

    if (!pieceMovementFlag) {
      if (piece.length == 0) {
        return;
      } else {
        [piece, color] = piece.split("-");

        if (piece == "king") {
          const possibleMoves = possibleMovesFunctions.king(squareName);
          setCurrentClickedSquareAndPiece(() => ({
            square: squareName,
            piece: piece,
            moves: possibleMoves,
          }));
        } else if (piece == "pawn") {
          const possibleMoves = possibleMovesFunctions.pawn(squareName, color);
          setCurrentClickedSquareAndPiece(() => ({
            square: squareName,
            piece: piece,
            moves: possibleMoves,
          }));
        }
        setPieceMovementFlag(true);
      }
    } else if (pieceMovementFlag) {
      if (piece.length == 0) {
        if (currentClickedSquareAndPiece.moves.includes(squareName)) {
          movePiece(currentClickedSquareAndPiece.square, squareName);
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
            <img src={dot} className="relative z-10" />
          )}
        </Square>
      ))}
    </div>
  );
};

export default Board;
