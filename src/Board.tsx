import * as React from 'react';
import { Grid, styled } from '@mui/material';

enum Player { X = 'X', O = 'O' }

const StyledSquare = styled('div')(({ theme }) => ({
    width:"150px",
    height:"150px",
    display: "flex",
    flexDirection: "column",
    backgroundColor:"#ffc365",
    fontSize: "150px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    alignContent: "center",
    justifyContent: "center"
}));

const WinningSquare = styled(StyledSquare)(({ theme }) => ({
    color: "red",
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

const Board = () => {
    
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>(Player.X);
    const [isOver, setIsOver] = React.useState<Boolean>(false);
    const [state, setState] = React.useState<(Player | undefined)[]>(initialiseState);
    const [winningCells, setWinningCells] = React.useState<number[]>([]);

    React.useEffect(checkOutcome, [state, currentPlayer])
    
    const Square = (props:{id: number, value: (Player | undefined), isWin: boolean}) => {
        function handleClick(index: number) {
            if (isOver) return;
            if (state[index] !== undefined) return;
            const updatedState: (Player | undefined)[] = Object.assign([],state);
            updatedState[index] = currentPlayer;
            setState(updatedState);
            setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
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

    function initialiseState() : (Player | undefined)[] {
        var initialisedState: (Player | undefined)[] = [];
        for (let i: number = 0; i < 9; i++) {
            initialisedState.push(undefined);
        }
        return initialisedState;
    }

    function checkOutcome() {
        for (let player in Player) {
            const playerLocations = state.reduce((acc: number[], curr, i) => {
                if (curr === player) {
                    acc.push(i);
                }
                return acc;
            }, [])
    
            for (var line of lines) {
                if (line.every(ln => playerLocations.includes(ln))) {
                    setIsOver(true);
                    setWinningCells(line);
                    console.log("player " + currentPlayer + " has won!");
                    break;
                }
            }
        }
    }

    return (
        <Grid container gridTemplateColumns="repeat(3, 1fr)" display="grid" maxWidth="fit-content" gap={1}>
            {
                state.map((cell, i) => {
                    return (<Grid item key={i} style={{width:"150px", height:"150px"}}><Square id={i} key={i} value={cell} isWin={winningCells.indexOf(i) !== -1}/></Grid>);
                })
            }
        </Grid>
    );
};

export default Board;