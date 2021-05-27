import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ReduxState } from "../redux";
import NotSignedInDropdown from './NotSignedInDropdown';
import SignedInDropdown from './SignedInDropdown';


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
        display: 'flex'
    },
    seatGeekImage: {
      height: '45px',
      marginLeft: '5px'
    }
  }),
);


const HeaderBar = () => {

    const classes = useStyles();

    const email = useSelector<ReduxState, ReduxState["email"]>(
      (state) => state.email
    );

    return (
        <AppBar position="static" className={classes.headerBar}>
            <Toolbar>
                <div className={classes.headerBarTextDiv}>
                  <div>
                      <Typography className={classes.headerBarTitle} variant="h1">Seat Geek Calendar</Typography>
                      <Typography className={classes.headerBarSubTitle} variant="h2">
                          Indepently operated.  Powered by
                      </Typography>
                  </div>
                  <a href="https://seatgeek.com/?seatgeekcalendardotcom=true" target="_blank" rel="noopener">
                    <img src="/static/SeatGeekLogo.png" className={classes.seatGeekImage} alt="Seat Geek Image" />
                  </a>
                </div>
                {
                  email
                  ?
                  <SignedInDropdown />
                  :
                  <NotSignedInDropdown />
                }
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;
