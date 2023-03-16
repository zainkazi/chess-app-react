import React from "react";

const Piece = ({
  id,
  name,
  image,
  type,
  side,
  location,
  reach,
  possibleMoves,
}) => {
  return (
    <div>
      <img src={image} className="w-10" alt="piece" />
    </div>
  );
};

export default Piece;
