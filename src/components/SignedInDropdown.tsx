import React, { Fragment } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import history from '../history';
import { BACKEND_URL, BACKEND_KEY, EMAIL_KEY } from '../constants';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 175,
    },
  }),
);



const SignedInDropdown = () => {

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // Handle correct selection
        if (event.target.value === 'accountSettings') {
          history.push('/account-settings');
        } else if (event.target.value === 'logout') {
          axios.post(`${BACKEND_URL}/backend/rest-auth/logout/`, {}, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
            }
          }).then(_ => {
              localStorage.removeItem(BACKEND_KEY);
              localStorage.removeItem(EMAIL_KEY);
              history.replace('/');
          }).catch(_ => {
              localStorage.removeItem(BACKEND_KEY);
              localStorage.removeItem(EMAIL_KEY);
              history.replace('/');
          })
        }
    };

    return (
        <Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Logged In</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleChange}
                    value={''}
                    label="Logged In"
                >
                  <MenuItem value={"accountSettings"}>Account Settings</MenuItem>
                  <MenuItem value={"logout"}>Logout</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default SignedInDropdown;
