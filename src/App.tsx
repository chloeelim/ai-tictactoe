import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { SmartToy, PeopleAlt } from '@mui/icons-material';
import Zoom from '@mui/material/Zoom';
import * as React from 'react';
import GameBoard from './Board';

const App = () => {
    const [isAgainstAI, setIsAgainstAI] = React.useState<boolean>(true);
    const handleToggleOpponent = (event: React.MouseEvent<HTMLElement>, isAgainstBot: boolean) => {
        setIsAgainstAI(isAgainstBot);
    };
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
                <h1 style={{textAlign: 'center', fontSize: '50px', color: 'linen', marginBottom: '0px'}}>TIC TAC TOE</h1>
                <div>
                    <div style={{display: 'flex', justifyContent: 'end', marginBottom: '20px'}}>
                        <ToggleButtonGroup exclusive>
                            <Tooltip arrow TransitionComponent={Zoom} title="Challenge the AI! You go first!">
                             <ToggleButton style={{backgroundColor: isAgainstAI ? "royalblue" : "#383851"}} value={true} selected={isAgainstAI} onClick={handleToggleOpponent}><SmartToy style={{color: 'white'}}/></ToggleButton>
                            </Tooltip>
                            <Tooltip arrow TransitionComponent={Zoom} title="Play against a friend (or yourself)!">
                                <ToggleButton style={{backgroundColor: isAgainstAI ? "#383851" : "royalblue"}} value={false} selected={!isAgainstAI} onClick={handleToggleOpponent}><PeopleAlt style={{color: 'white'}}/></ToggleButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        <GameBoard isAgainstAI={isAgainstAI}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;