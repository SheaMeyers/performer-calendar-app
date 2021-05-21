import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import '../css/AccountSettings.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SearchPerformers from './SearchPerformers';
import UserPerformersList from './UserPerformersList';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '1rem',
      background: 'lightgrey'
    },
  }),
);


const AccountSettings = () => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const classes = useStyles();
    
    return (
        <div className="Account-Settings-Container">
            <div className="Account-Settings">
                <h2>Account Settings</h2>
                <Paper className={classes.paper}>
                    <SearchPerformers />
                    <UserPerformersList />
                </Paper>
                <Button variant="contained">
                    Change Password
                </Button>
                <Button variant="contained" color="primary">
                    Logout
                </Button>
            </div>
        </div>
    )

}

export default AccountSettings;
