import { useSelector } from "react-redux";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ReduxState } from "../redux";
import SearchPerformers from './SearchPerformers';
import Performer from './Performer';

interface PerformerType {
    id: number;
    name: string;
    hex_color: string;
}

interface PerformerListProps {
    showCheckbox?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: '1rem',
            background: 'lightgrey'
        },
    }),
);

const PerformerList = (props: PerformerListProps) => {
    const classes = useStyles();

    const allPerformers = useSelector<ReduxState, ReduxState["allPerformers"]>(
        (state) => state.allPerformers
      );

    return (
        <Paper className={classes.paper}>
            <SearchPerformers />
            {allPerformers.map((performer: PerformerType) => {
                return (
                    <Performer 
                        key={performer.name} 
                        id={performer.id} 
                        name={performer.name} 
                        hex_color={performer.hex_color} 
                        showCheckbox={props.showCheckbox}
                    />
                )
            })}
        </Paper>
    )

}

export default PerformerList;
