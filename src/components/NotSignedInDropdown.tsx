import React, { Fragment, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SignInModal from './modal/SignInModal';
import SignUpModal from './modal/SignUpModal';
import ForgotPasswordModal from './modal/ForgotPasswordModal';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 175,
    },
  }),
);



const NotSignedInDropdown = () => {

    const classes = useStyles();
    
    const [shouldSignUpModalBeOpen, setShouldSignUpModalBeOpen] = useState<boolean>(false);
    const [shouldSignInModalBeOpen, setShouldSignInModalBeOpen] = useState<boolean>(false);
    const [shouldForgotPasswordModalBeOpen, setShouldForgotPasswordModalBeOpen] = useState<boolean>(false);

    const closeSignUpModal = () => setShouldSignUpModalBeOpen(false);
    const closeSignInModal = () => setShouldSignInModalBeOpen(false);
    const closeForgotPasswordModal = () => setShouldForgotPasswordModalBeOpen(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // Open correct modal
        if (event.target.value === 'signUp') {
          setShouldSignUpModalBeOpen(true);
        } else if (event.target.value === 'forgotPassword') {
          setShouldForgotPasswordModalBeOpen(true);
        }  else if (event.target.value === 'signIn') {
          setShouldSignInModalBeOpen(true);
        }
    };


    return (
        <Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Sign In/Sign Up</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleChange}
                    value={''}
                    label="signIn/Sign Up"
                >
                <MenuItem value={"signIn"}>Sign In</MenuItem>
                <MenuItem value={"forgotPassword"}>Forgot Password</MenuItem>
                <MenuItem value={"signUp"}>Sign Up</MenuItem>
                </Select>
            </FormControl>
            <SignUpModal
                isOpen={shouldSignUpModalBeOpen}
                handleModalClose={closeSignUpModal}
            />
            <SignInModal
                isOpen={shouldSignInModalBeOpen}
                handleModalClose={closeSignInModal}
            />
            <ForgotPasswordModal
                isOpen={shouldForgotPasswordModalBeOpen}
                handleModalClose={closeForgotPasswordModal}
            />
        </Fragment>
    )
}

export default NotSignedInDropdown;
