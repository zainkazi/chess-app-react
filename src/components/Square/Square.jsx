import React from "react";

const Square = ({ id, color, occupiedBy, name }) => {
  return (
    <div className={`${color} select-none pointer-events-none text-pink-600`}>
      {name}
    </div>
  );
};

export default Square;
