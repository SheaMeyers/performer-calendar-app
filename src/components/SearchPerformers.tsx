import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SearchPerformersResultsModal from './modal/SearchPerformersResultsModal';


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
);

const SearchPerformers = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>('');
  const [shouldSearchdModalBeOpen, setShouldSearchdModalBeOpen] = useState<boolean>(false);

  const closeSearchModal = () => {
    setQuery('');
    setShouldSearchdModalBeOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        onChange={event => setQuery(event.target.value)}
        value={query}
        className={classes.input}
        placeholder="Search Performers"
        inputProps={{ 'aria-label': 'Search performers' }}
        onKeyDown={e => {
          if (e.code === "Enter") {
            setShouldSearchdModalBeOpen(true);
          }
        }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"  onClick={_ => setShouldSearchdModalBeOpen(true)}>
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
