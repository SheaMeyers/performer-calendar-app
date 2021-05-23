import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { BACKEND_URL, BACKEND_KEY } from '../../constants';
import '../../css/Modal.css';


interface Props {
    isOpen: boolean
    handleModalClose: Function
}

const SignInModal = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Sign In Modal"
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
                
                setFeedbackMessage("Signing in...");

                axios.post(`${BACKEND_URL}/backend/rest-auth/login/`, 
                    {
                        email: email,
                        password: password,
                    })
                    .then(response => {
                        localStorage.setItem(BACKEND_KEY, response.data.key);
                        props.handleModalClose();
                    })
                    .catch(_ => setFeedbackMessage("Unable to sign in.  Please try again"));
                
            }}>
                <h2>Sign In</h2>
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
                {feedbackMessage && <p>{feedbackMessage}</p>}
                <Button variant="contained" type="submit" color="primary">
                    Sign In
                </Button>
                <Button variant="contained" onClick={event => props.handleModalClose()}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default SignInModal;
