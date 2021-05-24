import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import history from '../history';
import { handleLogout } from '../constants';


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
          handleLogout()
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
