import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Performer from './Performer';
import myPerformersList from '../examplePerformers';


interface PerformerType {
    name: string;
    color: string;
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

    return (
        <Card className={classes.card}>
            <CardContent>
                <h2>Performers</h2>
                {myPerformersList.map((performer: PerformerType) => {
                    return (
                        <Performer key={performer.name} name={performer.name} color={performer.color}/>
                    )
                })}
            </CardContent>
        </Card>
    )

}

export default PerformersList;
