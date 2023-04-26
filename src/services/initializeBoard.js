const initializeBoard = () => {
  // Inititalizing the empty board and board state

  let initialBoard = [];
  let boardState = {};
  let temp = [];

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
    }
  }

  for (var i = 63; i >= 0; i -= 8) {
    initialBoard.push(temp.slice(i - 7, i + 1));
  }
  initialBoard = [].concat(...initialBoard);

  return { initialBoard, boardState };
};

export default initializeBoard;
