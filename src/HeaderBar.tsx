import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


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
      },
    headerBarButton: {
      marginRight: theme.spacing(2),
    },
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
                <Button className={classes.headerBarButton}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;
