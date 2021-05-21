import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Band from './Band';
import myBandsList from '../exampleBands';


interface BandType {
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

const BandsList = () => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <h2>Performers</h2>
                {myBandsList.map((band: BandType) => {
                    return (
                        <Band key={band.name} name={band.name} color={band.color}/>
                    )
                })}
            </CardContent>
        </Card>
    )

}

export default BandsList;
