import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchPerformers from './SearchPerformers';
import UserPerformersList from './UserPerformersList';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: '1rem',
            background: 'lightgrey'
        },
    }),
);


interface NewPerformersListProps {
    showCheckbox?: boolean;
}

const NewPerformersList = (props: NewPerformersListProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <SearchPerformers />
            <UserPerformersList showCheckbox={props.showCheckbox} />
        </Paper>
    )

}

export default NewPerformersList;
