import React, { useState } from 'react';
import axios from 'axios';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import SearchPerformers from './SearchPerformers';
import UserPerformersList from './UserPerformersList';
import history from '../history';
import { BACKEND_URL, BACKEND_KEY } from '../constants';
import '../css/AccountSettings.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: '1rem'
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        },
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
            <Card>
                <CardContent className={classes.cardContent}>
                    <h2>Account Settings</h2>
                    <Paper className={classes.paper}>
                        <SearchPerformers />
                        <UserPerformersList />
                    </Paper>
                    <Button 
                        variant="contained" 
                        className={classes.button}
                        onClick={_ => history.push('/update-password')}
                    >
                        Change Password
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={_ => {
                            axios.post(`${BACKEND_URL}/backend/rest-auth/logout/`, {}, { 
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
                                }
                            }).then(_ => {
                                localStorage.removeItem(BACKEND_KEY);
                                history.replace('/');
                            }).catch(error => {
                                console.log('error');
                                console.log(error);
                                localStorage.removeItem(BACKEND_KEY);
                                history.replace('/');
                            })
                        }}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

}

export default AccountSettings;
