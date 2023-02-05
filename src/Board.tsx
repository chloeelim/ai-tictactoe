import * as React from 'react';
import { Grid, styled } from '@mui/material';
import NaiveMiniMax, { State } from './AI';
import HistoryBoard from './HistoryBoard';
import GameOutcome from './GameOutcome';

export enum Player { X = 'X', O = 'O' }
export enum Outcome { X = 'X', O = 'O', AI = 'AI', Tie = 'Tie'}
export type Board = {
    board: (Player | undefined)[];
}

const StyledSquare = styled('div')(({ theme }) => ({
    width:"150px",
    height:"150px",
    display: "flex",
    flexDirection: "column",
    backgroundColor:"#323435",
    fontSize: "150px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#E4E6E8",
    alignContent: "center",
    justifyContent: "center"
}));

const WinningSquare = styled(StyledSquare)(({ theme }) => ({
    color: "#b0b0b0",
    backgroundColor:"#191b1c",
}));

// indexes of winning lines
const lines = [
    // horizontal
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // vertical
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // diagonal
    [0, 4, 8], [2, 4, 6]
];

const GameBoard = (boardProps:{isAgainstAI: boolean}) => {
    
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>(Player.X);
    const [isOver, setIsOver] = React.useState<boolean>(false);
    const [state, setState] = React.useState<Board>(initialiseState);
    const [winningCells, setWinningCells] = React.useState<number[]>([]);
    const [history, setHistory] = React.useState<State[]>([]);
    const [gameOutcome, setGameOutcome] = React.useState<Outcome | undefined>(undefined);

    React.useEffect(checkOutcome, [state, currentPlayer])
    React.useEffect(resetBoard, [boardProps.isAgainstAI])
    
    const Square = (props:{id: number, value: (Player | undefined), isWin: boolean}) => {
        function handleClick(index: number) {
            if (isOver) return;
            if (state.board[index] !== undefined) return;
            if (boardProps.isAgainstAI && currentPlayer === Player.O) return;
            const updatedState: Board = Object.assign([], state);
            updatedState.board[index] = currentPlayer;
            
            const move = {
                board: updatedState,
                playerPlayed: currentPlayer,
                squarePlayed: index,
                score: -1
            };
            const updatedHistory = [...history, move];
            setState(updatedState);
            setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
            setHistory(updatedHistory);
            if (boardProps.isAgainstAI) getAIMove(updatedState, updatedHistory);
        }
        
        if (props.isWin) {
            return (
                <WinningSquare onClick={() => handleClick(props.id)}>{props.value}</WinningSquare>
            );
        }

        return (
            <StyledSquare onClick={() => handleClick(props.id)}>{props.value}</StyledSquare>
        );
    }

    function initialiseState() : Board {
        var initialisedState: undefined[] = [];
        for (let i: number = 0; i < 9; i++) {
            initialisedState.push(undefined);
        }
        return {board: initialisedState};
    }

    function checkOutcome() {
        for (let player of Object.values(Player)) {
            const playerLocations = state.board.reduce((acc: number[], curr, i) => {
                if (curr === player) {
                    acc.push(i);
                }
                return acc;
            }, [])
    
            for (let line of lines) {
                if (line.every(ln => playerLocations.includes(ln))) {
                    setIsOver(true);
                    setWinningCells(line);
                    
                    if (player === Player.X) {
                        setGameOutcome(Outcome.X);
                    } else if (boardProps.isAgainstAI) {
                        setGameOutcome(Outcome.AI);
                    } else {
                        setGameOutcome(Outcome.O);
                    }
                }
            }
        }
        if (state.board.findIndex(x => x === undefined) === -1) {
            setIsOver(true);
            setWinningCells([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            setGameOutcome(Outcome.Tie);
        }
    }

    function resetBoard() {
        setCurrentPlayer(Player.X);
        setIsOver(false);
        setState(initialiseState);
        setWinningCells([]);
        setHistory([]);
    }

    function getAIMove(updatedState: Board, updatedHistory: State[]) {
        const minimax: NaiveMiniMax = new NaiveMiniMax();
        const bestState = minimax.getBestState(updatedState, Player.O);
        setHistory([...updatedHistory, bestState]);
        setState(bestState.board);
        setCurrentPlayer(Player.X);
    }

    return (
        <div style={{display: 'flex'}}>
            <Grid container gridTemplateColumns="repeat(3, 1fr)" display="grid" maxWidth="fit-content" gap={1} paddingRight={3}>
                {
                    state.board.map((cell, i) => {
                        return (<Grid item key={i} style={{width:"150px", height:"150px"}}><Square id={i} key={i} value={cell} isWin={winningCells.indexOf(i) !== -1}/></Grid>);
                    })
                }
            </Grid>
            <div style={{width: '466px'}}>
                <GameOutcome visible={isOver} outcome={gameOutcome}/>
                <HistoryBoard moves={history} />
            </div>
        </div>
    );
};

export default GameBoard;
