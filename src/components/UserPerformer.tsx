import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Paper from '@material-ui/core/Paper';


interface UserPerformerProps {
    name: string;
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
        color: 'red'
    }
  }),
);

const UserPerformer = (props: UserPerformerProps) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <p className={classes.name}>{props.name}</p>
            <HighlightOffIcon className={classes.icon}/>
        </Paper>
    )

}

export default UserPerformer;
