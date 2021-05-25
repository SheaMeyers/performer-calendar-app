import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SearchPerformersResultsModal from './modal/SearchPerformersResults';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

const SearchPerformers = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>('');
  const [shouldSearchdModalBeOpen, setShouldSearchdModalBeOpen] = useState<boolean>(false);

  const closeSearchModal = () => setShouldSearchdModalBeOpen(false);

  return (
    <Paper className={classes.root}>
      <InputBase
        onChange={event => setQuery(event.target.value)}
        className={classes.input}
        placeholder="Add Performers"
        inputProps={{ 'aria-label': 'Add performers' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={_ => setShouldSearchdModalBeOpen(true)}>
        <SearchIcon />
      </IconButton>
      <SearchPerformersResultsModal 
        query={query}
        isOpen={shouldSearchdModalBeOpen}
        handleModalClose={closeSearchModal}
      />
    </Paper>
  )

}

export default SearchPerformers;
