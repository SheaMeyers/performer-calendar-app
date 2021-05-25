import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector } from "react-redux";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { PerformerState } from "../redux";
import myEventsList from '../exampleEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hexColor: string;
    url: string;
    tooltip?: string; 
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            margin: '1rem'
        }
    }),
);

const ReactBigCalendar = () => {

    const performers = useSelector<PerformerState, PerformerState["performers"]>(
        (state) => state.performers
      );

    const eventStyleGetter = (event: Event) => {
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };

    }

    const eventTooltipGetter = (event: Event) => {
        return event.tooltip || event.title;
    }

    const handleOnSelectEvent = (event: Event, syntheticEvent: React.SyntheticEvent) => {
        window.open(event.url, "_blank");
    }

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Calendar
                    localizer={momentLocalizer(moment)}
                    events={myEventsList.filter((event: Event) => performers.includes(event.title))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, width: 700 }}
                    tooltipAccessor={eventTooltipGetter}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleOnSelectEvent}
                />
            </CardContent>
        </Card>
    )
}

export default ReactBigCalendar;
