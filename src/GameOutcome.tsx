import * as React from 'react';
import { Outcome } from './Board';

const GameOutcome = (props: {visible: boolean, outcome: (Outcome | undefined)}) => {
    if (!props.visible) {
        return (<></>);
    }

    let message;

    switch (props.outcome) {
        case (Outcome.AI):
            message = "AI (Player O) has won!"
            break;
        case (Outcome.O):
            message = "Player O has won!"
            break;
        case (Outcome.X):
            message = "Player X has won!"
            break;
        case (Outcome.Tie):
            message = "A tie has been reached!"
            break;
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{color: "white"}}>{message}</h1>
        </div>
    );
}

export default GameOutcome;
