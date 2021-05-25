import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Button from '@material-ui/core/Button';
import '../../css/Modal.css';


interface Props {
    query: string
    isOpen: boolean
    handleModalClose: Function
}

const SearchPerformersResultsModal = (props: Props) => {
    const [results, setResults] = useState<string[] | null>(null);

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Forgot Password Modal"
            closeTimeoutMS={200}
            className="modal"
        >
            <h2>Performers</h2>
            {results === null && <p>Searching...</p>}
            {results === [] && <p>No results found</p>}
            {results && 
                <p>loop through results here with map</p>
            }
            <Button variant="contained" onClick={_ => props.handleModalClose()}>
                Close
            </Button>
        </Modal>
    );
};

export default SearchPerformersResultsModal;
