import { useSelector } from "react-redux"
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { ReduxState } from "../redux"
import SearchPerformers from './SearchPerformers'
import Performer from './Performer'
import { Performer as PerformerInterface } from '../interfaces'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: '1rem',
            background: 'lightgrey'
        },
    }),
)


interface PerformerListProps {
    showCheckbox?: boolean
}


const PerformerList = (props: PerformerListProps) => {
    const classes = useStyles()

    const allPerformers = useSelector<ReduxState, ReduxState["allPerformers"]>(
        (state) => state.allPerformers
      )

    return (
        <Paper className={classes.paper}>
            <SearchPerformers />
            {allPerformers.map((performer: PerformerInterface) => {
                return (
                    <Performer 
                        id={performer.id}
                        key={performer.name} 
                        name={performer.name} 
                        hexColor={performer.hexColor} 
                        showCheckbox={props.showCheckbox}
                    />
                )
            })}
        </Paper>
    )

}

export default PerformerList
