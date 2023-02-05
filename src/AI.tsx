import { Player } from "./Board";

interface AI {
  getBestState(board: (Player | undefined)[], currentPlayer: Player): State
}

type State = {
  board: (Player | undefined)[];
  playerPlayed: Player;
  squarePlayed: number;
  score: number;
}

function getWinner(board: (Player | undefined)[]): (Player | undefined) {
  // indexes of winning lines
  const lines = [
    // horizontal
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // vertical
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // diagonal
    [0, 4, 8], [2, 4, 6]
  ];

  for (let player of Object.values(Player)) {
    const playerLocations = board.reduce((acc: number[], curr, i) => {
      if (curr === player) acc.push(i);
      return acc;
    }, [])

    for (let line of lines) {
        if (line.every(ln => playerLocations.includes(ln))) {
            return player;
        }
    }
  }

  return undefined;
}

class NaiveMiniMax implements AI {
  getBestState(board: (Player | undefined)[], currentPlayer: Player): State {
    const winner = getWinner(board);
    const otherPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    if (winner === Player.X) {
      return {
        board: board,
        playerPlayed: otherPlayer,
        squarePlayed: -1,
        score: 1
      };
    } else if (winner === Player.O) {
      return {
        board: board,
        playerPlayed: otherPlayer,
        squarePlayed: -1,
        score: -1
      };
    }

    if (board.findIndex(x => x === undefined) === -1) { // tie
      return {
        board: board,
        playerPlayed: otherPlayer,
        squarePlayed: -1,
        score: 0
      };
    }

    var nextStates: State[] = [];

    for (let i: number = 0; i < 9; i++) {
      if (board[i] === undefined) {
        const nextBoard = [...board];
        nextBoard[i] = currentPlayer;
        var nextState = {
          board: nextBoard,
          playerPlayed: otherPlayer,
          squarePlayed: i,
          score: this.getBestState(nextBoard, otherPlayer).score
        }
        nextStates.push(nextState);
      }
    }

    let bestState: State;

    if (currentPlayer === Player.X) {
      // human player (MAX)
      bestState = {
        board: board,
        playerPlayed: currentPlayer,
        squarePlayed: -1,
        score: -Infinity
      };

      for (const state of nextStates) {
        if (state.score > bestState.score) bestState = state;
      }
    } else {
      // AI player (MIN)
      bestState = {
        board: board,
        playerPlayed: currentPlayer,
        squarePlayed: -1,
        score: Infinity
      };

      for (const state of nextStates) {
        if (state.score < bestState.score) bestState = state;
      }
    }

    return bestState;
  }
}

export default NaiveMiniMax;
