import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ReduxState } from "../redux";
import Performer from './Performer';
import { EMAIL_KEY } from '../constants';


interface PerformerType {
    id: number;
    name: string;
    hex_color: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            margin: '1rem'
        }
    }),
);

const PerformersList = () => {

    const classes = useStyles();
    const allPerformers = useSelector<ReduxState, ReduxState["allPerformers"]>(
        (state) => state.allPerformers
      );

    return (
        <Card className={classes.card}>
            <CardContent>
                <h2>Performers</h2>
                { localStorage.getItem(EMAIL_KEY) === null &&
                    <p>Sign in or sign up to add performers</p>
                }
                { allPerformers.length === 0 && localStorage.getItem(EMAIL_KEY) &&
                    <span>
                        <p>Add performers in your Account Settings</p>
                        <p>(Dropdown on the top right)</p>
                    </span>
                }
                {allPerformers.map((performer: PerformerType) => {
                    return (
                        <Performer key={performer.name} id={performer.id} name={performer.name} hex_color={performer.hex_color}/>
                    )
                })}
            </CardContent>
        </Card>
    )

}

export default PerformersList;
