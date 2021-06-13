import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector } from "react-redux";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ReduxState } from "../redux";
import 'react-big-calendar/lib/css/react-big-calendar.css';


interface Performer {
    id: number
    name: string
    hex_color: string
}


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hex_color: string;
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

    const events = useSelector<ReduxState, ReduxState["events"]>(
        (state) => state.events
      );
    const selectedPerformers = useSelector<ReduxState, ReduxState["selectedPerformers"]>(
        (state) => state.selectedPerformers
      );
    const performers_titles = selectedPerformers.map((selectedPerformers: Performer) => selectedPerformers.name)

    const eventStyleGetter = (event: Event) => {
        const style = {
            backgroundColor: event.hex_color.toLocaleLowerCase(),
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        }
        return {
            style: style
        }
    }

    const eventTooltipGetter = (event: Event) => {
        return event.tooltip || event.title;
    }

    const handleOnSelectEvent = (event: Event, syntheticEvent: React.SyntheticEvent) => {
        window.open(event.url, "_blank", "noopener");
    }

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Calendar
                    localizer={momentLocalizer(moment)}
                    events={events.filter((event: Event) => performers_titles.includes(event.title))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    tooltipAccessor={eventTooltipGetter}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleOnSelectEvent}
                />
            </CardContent>
        </Card>
    )
}

export default ReactBigCalendar;
