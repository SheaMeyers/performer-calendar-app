import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { BACKEND_KEY, BACKEND_URL } from '../../constants';
import '../../css/Modal.css';


interface Props {
    query: string
    isOpen: boolean
    handleModalClose: Function
}

interface PerformerResult {
    name: string
    id: number
}

const SearchPerformersResultsModal = (props: Props) => {
    const [results, setResults] = useState<PerformerResult[] | null>(null);

    useEffect(() => {
        if (props.query && props.isOpen) {
            axios.post(`${BACKEND_URL}/backend/search-performers/`, 
                {
                    query: props.query,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
                    }
                })
                .then(response => {
                    console.log('response.data');
                    console.log(response.data);
                    setResults(response.data);
                })
                .catch(_ => setResults([]))
        }
    }, [props.isOpen]);

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
                results.map(result => {
                    return (
                        <div>
                            <p>{result.name}</p>
                        </div>
                    )
                })
            }
            <Button variant="contained" onClick={_ => props.handleModalClose()}>
                Close
            </Button>
        </Modal>
    );
};

export default SearchPerformersResultsModal;
