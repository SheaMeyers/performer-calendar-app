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

const ForgotPasswordModal = (props: Props) => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Forgot Password Modal"
            closeTimeoutMS={200}
            className="modal"
        >
            <form onSubmit={event => {
                event.persist();
                event.preventDefault();

                // @ts-ignore
                const elements = event.target.elements;
                const email = elements.email.value;

                
                //     axios.post(`${domainUrl}/backend/sign-in`, 
                //         {
                //             email: email,
                //             password: password,
                //         })
                //         .then(_ => Refresh page)
                //         })
                //         .catch(_ => setFeedbackMessage("Unable to sign in.  Please try again"));
                
            }}>
                <h2>Forgot Password</h2>
                <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    type="email"
                />
                {feedbackMessage && <p>{feedbackMessage}</p>}
                <Button variant="contained" type="submit" color="primary">
                    Send Email
                </Button>
                <Button variant="contained" onClick={event => props.handleModalClose()}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default ForgotPasswordModal;