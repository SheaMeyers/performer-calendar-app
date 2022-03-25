import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import axios from "axios"
import { useDispatch } from "react-redux"
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { ShowPerformer, Event } from '../interfaces'
import { SEATGEEK_ENDPOINT, SEATGEEK_APIKEY } from '../api'
import '../css/Modal.css'
import '../css/SearchPerformersResultsModal.css'


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
)


interface Props {
    query: string
    isOpen: boolean
    handleModalClose: Function
}


const SearchPerformersResultsModal = (props: Props) => {
    const [results, setResults] = useState<ShowPerformer[] | null>(null)
    const [feedback, setFeedback] = useState<string>('')
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        Modal.setAppElement('body')
        if (props.query && props.isOpen) {
            axios.get(`${SEATGEEK_ENDPOINT}performers?q=${props.query}&client_id=${SEATGEEK_APIKEY}`)
              .then((response) => setResults(response.data.performers.map((performer: any): ShowPerformer => { 
                  return { 
                      id: performer.id,
                      name: performer.name,
                      hexColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                      showCheckbox: true
                  }
                })))
              .catch((_) => setResults([]))
        }
    }, [props.isOpen])

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel='Display search results modal'
            closeTimeoutMS={200}
            className="modal search-performers-results-modal"
        >
            <h2>Performers</h2>
            {props.query === "" && <p>No value entered</p>}
            {results === null && props.query !== '' && <p>Searching...</p>}
            {results === [] && <p>No results found</p>}
            {feedback && <p>{feedback}</p>}
            {results && 
                results.map((result: ShowPerformer) => {
                    return (
                        <Paper 
                            key={result.id}
                            className={classes.paper}
                            onClick={_ => {
                                setFeedback(`Getting events for ${result.name}. Please wait.`)
                                axios.get(`${SEATGEEK_ENDPOINT}events?performers.id=${result.id}&client_id=${SEATGEEK_APIKEY}`)
                                    .then(response => {
                                        const events: Event[] = response.data.events.map((event: any) => {
                                            return {
                                                id: event.id,
                                                title: result.name,
                                                start: event.datetime_local,
                                                end: event.datetime_local.split('T')[0] + 'T23:59:59',
                                                hexColor: result.hexColor,
                                                url: event.url
                                            }
                                        })
                                        dispatch({ type: "ADD_PERFORMERS", payload: [result] })
                                        dispatch({ type: "ADD_EVENTS", payload: events })
                                        props.handleModalClose()
                                        setResults(null)
                                        setFeedback('')
                                    }).catch(_ => {
                                        props.handleModalClose()
                                        setResults(null)
                                        setFeedback('')
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
                    props.handleModalClose()
                    setResults(null)
            }}>
                Close
            </Button>
        </Modal>
    )
}

export default SearchPerformersResultsModal
