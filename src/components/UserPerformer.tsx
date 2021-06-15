import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { BACKEND_KEY, BACKEND_URL } from '../constants';


interface UserPerformerProps {
    id: number;
    name: string;
    hex_color: string;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      alignItems: 'center',
      margin: '1rem 0',
      padding: '0 1rem'
    },
    name: {
        flexGrow: 1
    },
    icon: {
        color: 'red',
        cursor: 'pointer'
    }
  }),
);

const UserPerformer = (props: UserPerformerProps) => {

    const [checked, setChecked] = useState<boolean>(true);

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            dispatch({ type: "ADD_SELECTED_PERFORMER", payload: props });
        } else {
            dispatch({ type: "REMOVE_SELECTED_PERFORMER", payload: props.name });
        }
    };

    return (
        <Paper className={classes.paper}>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                style={{color: `${props.hex_color.toLocaleLowerCase()}`}}
            />
            <p className={classes.name}>{props.name}</p>
            <HighlightOffIcon 
              className={classes.icon}
              onClick={_ => {
                axios.post(`${BACKEND_URL}/backend/remove-performer/`, {
                  name: props.name
                }, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
                  }
              }).then(_ => {
                  dispatch({ type: "REMOVE_PERFORMER", payload: props.name });
                  dispatch({ type: "REMOVE_EVENTS", payload: props.name });
              }).catch(_ => {/* Do nothing.  User will have to try again later */})
              }}
            />
        </Paper>
    )

}

export default UserPerformer;
