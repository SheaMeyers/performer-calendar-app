import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerBar: {
      backgroundColor: "#ffffff",
      marginTop: "1rem",
    },
    fixedFooterBar: {
      backgroundColor: "#ffffff",
      marginTop: "1rem",
      position: "fixed",
      bottom: 0
    },
    footerBarText: {
      color: "#000000",
      fontSize: "1rem"
    }
  }),
);


const FooterBar = () => {

  const classes = useStyles();
  const [fixedPosition, setFixedPosition] = useState<boolean>(true);

  useEffect(() => {
    setFixedPosition(document.body.clientHeight < window.innerHeight);
  }, [document.body.clientHeight]);

  return (
    <AppBar position="static" className={fixedPosition ? classes.fixedFooterBar : classes.footerBar}>
      <Toolbar>
        <Typography className={classes.footerBarText} variant="h2">
          Questions or concerns?  <a href="mailto:seatgeekcalendar@gmail.com">Send an email</a>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default FooterBar;