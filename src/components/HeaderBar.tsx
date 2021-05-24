import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotSignedInDropdown from './NotSignedInDropdown';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerBar: {
      backgroundColor: "#ffffff",
      marginBottom: "1rem"
    },
    headerBarTitle: {
        color: "#000000",
        fontSize: "1.5rem"
    },
    headerBarSubTitle: {
        color: "#000000",
        fontSize: "1rem"
    },
    headerBarTextDiv: {
        flexGrow: 1,
    }
  }),
);



const HeaderBar = () => {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.headerBar}>
            <Toolbar>
                <div className={classes.headerBarTextDiv}>
                    <Typography className={classes.headerBarTitle} variant="h1">Seat Geek Calendar</Typography>
                    <Typography className={classes.headerBarSubTitle} variant="h2">
                        Indepently operated. Powered by SeatGeek API (Thanks SeatGeek!).
                    </Typography>
                </div>
                <NotSignedInDropdown />
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;
