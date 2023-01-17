import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerBar: {
      backgroundColor: "#ffffff",
      marginBottom: "1rem"
    },
    headerBarToolbar: {
      ['@media (max-width:450px)']: {  // eslint-disable-line no-useless-computed-key
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
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
    ticketmasterImage: {
      height: '45px',
      marginLeft: '5px'
    },
    extraInfoText: {
      color: "#000000",
      fontSize: "1rem"
    }
  }),
)


const HeaderBar = () => {

    const classes = useStyles()

    return (
        <AppBar position="static" className={classes.headerBar}>
            <Toolbar className={classes.headerBarToolbar}>
                <div className={classes.headerBarTextDiv}>
                  <div>
                      <Typography className={classes.headerBarTitle} variant="h1">Ticketmaster Calendar</Typography>
                      <Typography className={classes.headerBarSubTitle} variant="h2">
                          Independently operated.  Powered by
                      </Typography>
                  </div>
                  <a href="https://ticketmaster.com/?ticketmastercalendardotcom=true" target="_blank" rel="noopener noreferrer">
                    <img src="./TicketmasterLogo.png" className={classes.ticketmasterImage} alt="Ticketmaster Calendar" />
                  </a>
                </div>
                <Typography className={classes.extraInfoText} variant="h2">
                  Questions?  <br/>
                  <a href="https://github.com/SheaMeyers/performer-calendar-app" target="_blank" rel="noopener noreferrer">see the code</a>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar
