import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { BACKEND_URL } from '../../constants';
import '../../css/Modal.css';


interface Props {
    query: string
    isOpen: boolean
    handleModalClose: Function
}

const SearchPerformersResultsModal = (props: Props) => {
    const [results, setResults] = useState<string[]>([]);

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Forgot Password Modal"
            closeTimeoutMS={200}
            className="modal"
        >
            <h2>Performers</h2>
            <p>query {props.query}</p>
            <p>Searching...</p>
            <Button variant="contained" onClick={_ => props.handleModalClose()}>
                Close
            </Button>
        </Modal>
    );
};

export default SearchPerformersResultsModal;
