import * as React from 'react';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { State } from './AI';

const HistoryBoard = (props:{moves:State[]}) => {
    console.log(props.moves);
    return (
        <List style={{backgroundColor: '#393939', maxHeight: 466, overflow: 'auto', borderRadius: '10px 10px 20px 20px', paddingTop: '0px'}}>
            <ListSubheader style={{color: '#ccc', backgroundColor: '#2b2b2b', fontWeight: 'bold', fontSize: '18px'}}>Game History</ListSubheader>
            {
                props.moves.map((state, i) => (
                    <ListItem key={i} style={{backgroundColor: '#515151', margin: '5px 0'}}>
                        <ListItemText primaryTypographyProps={{color: '#999', fontSize: '16px', fontWeight: 'bold'}}>{state.playerPlayed} marked square
                        ({Math.floor(state.squarePlayed / 3)}, {state.squarePlayed % 3})</ListItemText>
                    </ListItem>
                ))
            }
        </List>
    );
}

export default HistoryBoard;
