import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { BACKEND_KEY, BACKEND_URL } from '../../constants';
import '../../css/Modal.css';
import '../../css/SearchPerformersResultsModal.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      alignItems: 'center',
      margin: '1rem 0',
      padding: '0 1rem',
      cursor: 'pointer'
    }
  }),
);


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
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (props.query && props.isOpen) {
            axios.post(`${BACKEND_URL}/backend/search-performers/`, 
                {
                    query: props.query,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => setResults(response.data))
                .catch(_ => setResults([]))
        }
    }, [props.isOpen]);

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Forgot Password Modal"
            closeTimeoutMS={200}
            className="modal search-performers-results-modal"
        >
            <h2>Performers</h2>
            {props.query === "" && <p>No value entered</p>}
            {results === null && props.query !== '' && <p>Searching...</p>}
            {results === [] && <p>No results found</p>}
            {results && 
                results.map(result => {
                    return (
                        <Paper 
                            className={classes.paper}
                            onClick={_ => {
                                let headers: { 'Content-Type': string; 'Authorization'?: string; } = {'Content-Type': 'application/json'}
                                if (localStorage.getItem(BACKEND_KEY)) {
                                    headers['Authorization'] = `Token ${localStorage.getItem(BACKEND_KEY)}`
                                }

                                axios.post(`${BACKEND_URL}/backend/add-performer/`, 
                                {
                                    id: result.id,
                                    name: result.name
                                }, {
                                    headers
                                })
                                .then(response => {
                                    dispatch({ type: "ADD_PERFORMERS", payload: [response.data.performer] });
                                    dispatch({ type: "ADD_EVENTS", payload: response.data.events });
                                    props.handleModalClose();
                                    setResults(null);
                                })
                                .catch(_ => {
                                    props.handleModalClose();
                                    setResults(null);
                                })
                            }}
                        >
                            <p>{result.name}</p>
                        </Paper>
                    )
                })
            }
            <Button 
                variant="contained" 
                onClick={_ => {
                    props.handleModalClose();
                    setResults(null);
            }}>
                Close
            </Button>
        </Modal>
    );
};

export default SearchPerformersResultsModal;
