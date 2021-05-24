import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { BACKEND_URL, BACKEND_KEY, EMAIL_KEY } from '../../constants';
import '../../css/Modal.css';


interface Props {
    isOpen: boolean
    handleModalClose: Function
}

const SignUpModal = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const dispatch = useDispatch();

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Sign Up Modal"
            closeTimeoutMS={200}
            className="modal"
        >
            <form onSubmit={event => {
                event.persist();
                event.preventDefault();

                // @ts-ignore
                const elements = event.target.elements;
                const email = elements.email.value;
                const password = elements.password.value;
                const secondPassword = elements.secondPassword.value;

                const passwordsMatch = password === secondPassword;
                const isStrongPassword = password.length > 8 && /\d/.test(password);

                if (passwordsMatch && isStrongPassword) {
                    setFeedbackMessage("Signing up...");
                    axios.post(`${BACKEND_URL}/backend/rest-auth/registration/`, 
                        {
                            email: email,
                            password1: password,
                            password2: secondPassword,
                        })
                        .then(response => {
                            localStorage.setItem(BACKEND_KEY, response.data.key);
                            localStorage.setItem(EMAIL_KEY, email);
                            dispatch({ type: "ADD_EMAIL", payload: email });
                            props.handleModalClose();
                        })
                        .catch(error => {
                            setFeedbackMessage("Unable to sign up.  Please try a more secure password or try again later.")
                    });
                } else if (!isStrongPassword) {
                    setFeedbackMessage("Password must be at least 8 characters long with at least one number");
                } else {
                    setFeedbackMessage("Passwords do not match");
                }
            }}>
                <h2>Sign Up</h2>
                <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    type="email"
                />
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
                    Sign Up
                </Button>
                <Button variant="contained" onClick={event => props.handleModalClose()}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default SignUpModal;
