import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import history from '../history';
import { EMAIL_KEY, handleLogout } from '../constants';
import NewPerformersList from './NewPerformersList';
import '../css/AccountSettings.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: '1rem'
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        }
    }),
);


const AccountSettings = () => {
    const classes = useStyles();

    return (
        <div className="Account-Settings-Container">
            <Card>
                <CardContent className={classes.cardContent}>
                    <h2>Account Settings</h2>
                    <p>Logged in as <b>{localStorage.getItem(EMAIL_KEY)}</b></p>
                    <NewPerformersList />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={_ => history.push('/') }
                    >
                        Home
                    </Button>
                    <Button 
                        variant="contained" 
                        className={classes.button}
                        onClick={_ => history.push('/update-password')}
                    >
                        Change Password
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        onClick={_ => handleLogout() }
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

}

export default AccountSettings;
