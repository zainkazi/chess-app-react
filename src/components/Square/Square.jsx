import React from "react";

const Square = ({ children, id, color, occupiedBy, name }) => {
  return (
    <div className={`${color} select-none pointer-events-none text-pink-600`}>
      {name}
      {children}
    </div>
  );
};

export default Square;
