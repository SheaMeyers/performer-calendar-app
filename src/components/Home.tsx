import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NewPerformersList from './NewPerformersList';
import Calendar from './Calendar';
import '../css/Home.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: '1rem'
    }
  }),
);

const Home = () => {

  const classes = useStyles();

  return (
    <div className="Home">
      <Card className={classes.card}>
        <CardContent>
          <h2>Performers</h2>
          <NewPerformersList showCheckbox={true} />
        </CardContent>
      </Card>
      <Calendar />
    </div>
  );
}

export default Home;
