import { useState } from 'react'
import { useDispatch } from "react-redux"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { getEvents } from '../api'
import { ShowPerformer } from '../interfaces'
import { generateHexColor } from '../utils'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
)

const SearchPerformers = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [query, setQuery] = useState<string>('')

  const searchEvents = async () => {
    const newHexColor = generateHexColor()
    const events = await getEvents(query, newHexColor)
    const newResult: ShowPerformer = {
      hexColor: newHexColor,
      id: newHexColor,
      name: query,
      showCheckbox: true
    }
    dispatch({ type: "ADD_PERFORMERS", payload: [newResult] })
    dispatch({ type: "ADD_EVENTS", payload: events })
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        onChange={event => setQuery(event.target.value)}
        value={query}
        className={classes.input}
        placeholder="Search Performers"
        inputProps={{ 'aria-label': 'Search performers' }}
        onKeyDown={async e => {
          if (e.code === "Enter") {
            await searchEvents()
          }
        }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"  onClick={async () => await searchEvents()}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )

}

export default SearchPerformers
