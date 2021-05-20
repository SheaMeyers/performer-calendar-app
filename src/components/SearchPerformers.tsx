import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

const SearchPerformers = () => {
    const classes = useStyles();

    return (
        <form onSubmit={event => {
            event.persist();
            event.preventDefault();

            // @ts-ignore
            const elements = event.target.elements;
            const email = elements.email.value;
            const password = elements.password.value;
            const secondPassword = elements.secondPassword.value;
            const isSupervisor = elements.checkbox.checked;

            const passwordsMatch = password === secondPassword;
            const isStrongPassword = password.length > 8 && /\d/.test(password);

            // if (passwordsMatch && isStrongPassword) {
            //     axios.post(`${domainUrl}/backend/sign-up`, 
            //         {
            //             email: email,
            //             password: password,
            //         })
            //         .then(_ => {setFeedbackMessage("Please check your email for further instructions")
            //         })
            //         .catch(_ => setFeedbackMessage("Unable to sign up.  Please try again later"));
            // } else if (!isStrongPassword) {
            //     setFeedbackMessage("Password must be at least 8 characters long with at least one number");
            // } else {
            //     setFeedbackMessage("Passwords do not match");
            // }
        }}>
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Add Performers"
                    inputProps={{ 'aria-label': 'Add performers' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </form>
    )

}

export default SearchPerformers;
