import { useState, useEffect } from "react"
import Modal from "react-modal"
import { useDispatch } from "react-redux"
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { ShowPerformer } from '../interfaces'
import { getPerformers, getPerformerEvents } from '../api'
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
        const addPerformers = async (query: string) => {
            const performers = await getPerformers(query)
            setResults(performers)
        }

        if (props.query && props.isOpen) {
            addPerformers(props.query)
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
                            onClick={async () => {
                                setFeedback(`Getting events for ${result.name}. Please wait.`)
                                const events = await getPerformerEvents(result)
                                dispatch({ type: "ADD_PERFORMERS", payload: [result] })
                                dispatch({ type: "ADD_EVENTS", payload: events })
                                props.handleModalClose()
                                setResults(null)
                                setFeedback('')
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
