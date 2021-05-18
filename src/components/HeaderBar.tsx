import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }),
);



const HeaderBar = () => {

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // Open correct modal
        console.log(event.target.value);
    };


    return (
        <AppBar position="static" className={classes.headerBar}>
            <Toolbar>
                <div className={classes.headerBarTextDiv}>
                    <Typography className={classes.headerBarTitle} variant="h1">Seat Geek Calendar</Typography>
                    <Typography className={classes.headerBarSubTitle} variant="h2">
                        Indepently operated. Powered by SeatGeek API (Thanks SeatGeek!).
                    </Typography>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Login/Sign Up</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleChange}
                    label="Login/Sign Up"
                  >
                    <MenuItem value={"login"}>Login</MenuItem>
                    <MenuItem value={"forgotPassword"}>Forgot Password</MenuItem>
                    <MenuItem value={"signUp"}>Sign Up</MenuItem>
                  </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;
