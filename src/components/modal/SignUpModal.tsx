import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import '../../css/Modal.css';


interface Props {
    isOpen: boolean
    handleModalClose: Function
}

const SignUpModal = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

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
                const isSupervisor = elements.checkbox.checked;

                const passwordsMatch = password === secondPassword;
                const isStrongPassword = password.length > 8 && /\d/.test(password);

                // if (passwordsMatch && isStrongPassword) {
                //     axios.post(`${domainUrl}/backend/sign-up`, 
                //         {
                //             email: email,
                //             password: password,
                //         })
                //         .then(_ => {setFeedbackMessage("Please check your email for further instructions")
                //         })
                //         .catch(_ => setFeedbackMessage("Unable to sign up.  Please try again later"));
                // } else if (!isStrongPassword) {
                //     setFeedbackMessage("Password must be at least 8 characters long with at least one number");
                // } else {
                //     setFeedbackMessage("Passwords do not match");
                // }
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