import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import { BACKEND_KEY, BACKEND_URL, EMAIL_KEY, getInfo } from '../constants';
import history from '../history';
import '../css/UpdatePassword.css';


const UpdatePassword = () => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const dispatch = useDispatch();

    const encodedToken = new URLSearchParams(window.location.search).get('token');
    const email = new URLSearchParams(window.location.search).get('email');
    if (encodedToken) {
        localStorage.setItem(BACKEND_KEY, atob(encodedToken));
    }
    
    return (
        <div className="Update-Password-Container">
            <Card>
                <CardContent>
                    <form 
                        className="Update-Password__form"
                        onSubmit={event => {
                            event.persist();
                            event.preventDefault();

                            // @ts-ignore
                            const elements = event.target.elements;
                            const password = elements.password.value;
                            const secondPassword = elements.secondPassword.value;

                            const passwordsMatch = password === secondPassword;
                            const isStrongPassword = password.length > 8 && /\d/.test(password);

                            if (passwordsMatch && isStrongPassword) {
                                setFeedbackMessage("Changing password...");
                                axios.post(`${BACKEND_URL}/backend/rest-auth/password/change/`, 
                                    {
                                        new_password1: password,
                                        new_password2: secondPassword,
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
                                        }
                                    })
                                    .then(_ => {
                                        if (email) {
                                            localStorage.setItem(EMAIL_KEY, email);
                                            dispatch({ type: "ADD_EMAIL", payload: email });
                                            getInfo();
                                        }
                                        history.replace('/');
                                    })
                                    .catch(_ => {
                                        setFeedbackMessage("Unable to change password.  Please try a more secure password or try again later.")
                                });
                            } else if (!isStrongPassword) {
                                setFeedbackMessage("Password must be at least 8 characters long with at least one number");
                            } else {
                                setFeedbackMessage("Passwords do not match");
                            }
                    }}>
                        <h2>Enter new password</h2>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-second-password-input"
                            label="Re-enter Password"
                            type="password"
                            name="secondPassword"
                            margin="normal"
                            variant="outlined"
                        />
                        {feedbackMessage && <p>{feedbackMessage}</p>}
                        <Button variant="contained" type="submit" color="primary">
                            Change
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default UpdatePassword;
