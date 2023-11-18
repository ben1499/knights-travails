function knightsTravails() {
  let board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push(null);
    }
  }

  const moves = [
    [1, 2],
    [2, 1],
    [1, -2],
    [-2, 1],
    [-1, 2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  const checkCoordinateValid = (x, y) => {
    if (x > -1 && x < 8 && y > -1 && y < 8) return true;
    return false;
  };

  const searchPath = (x, y) => {
    return moves
      .map((coordinate) => [x + coordinate[0], y + coordinate[1]])
      .filter((coordinate) =>
        checkCoordinateValid(coordinate[0], coordinate[1])
      );
  };

  const knightMoves = (start, end) => {
    if (
      start[0] < 0 ||
      start[1] < 0 ||
      start[0] > 7 ||
      start[1] > 7 ||
      end[0] < 0 ||
      end[1] < 0 ||
      end[0] > 7 ||
      end[1] > 7
    ) {
      console.log("Invalid coordinate");
      return;
    }

    const queue = [start];
    while (queue.length != 0) {
      const currCoord = queue.shift();

      if (currCoord[0] == end[0] && currCoord[1] == end[1]) break;

      const path = searchPath(currCoord[0], currCoord[1]);

      for (let coordinate of path) {
        if (board[coordinate[0]][coordinate[1]] != null) continue;
        queue.push(coordinate);
        board[coordinate[0]][coordinate[1]] = currCoord;
      }
    }

    const path = [];
    let currCoord = end;
    path.push(currCoord);
    while (currCoord[0] != start[0] || currCoord[1] != start[1]) {
      currCoord = board[currCoord[0]][currCoord[1]];
      path.unshift(currCoord);
    }

    console.log(`You made it in ${path.length} moves! Here's your path:`);
    path.forEach((item) => {
      console.log(item);
    });
  };

  return {
    board,
    knightMoves,
  };
}

const game = knightsTravails();

game.knightMoves([2, 2], [5, 5]);
