import * as React from 'react';
import Board from './Board';

const App = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
                <h1 style={{textAlign: 'center', fontSize: '50px', color: 'linen'}}>TIC TAC TOE</h1>
                <div>
                    <Board isAgainstAI={true}/>
                </div>
            </div>
        </div>
    );
};

export default App;