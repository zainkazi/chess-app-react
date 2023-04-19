import React, { useState } from "react";

const Square = ({ onSquareClick, children, color, name }) => {
  const [flag, setFlag] = useState(false);

  return (
    <div
      onClick={() => onSquareClick(name)}
      className={`${color} text-pink-600`}
    >
      {name}
      {children}
    </div>
  );
};

export default Square;
