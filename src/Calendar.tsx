import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import myEventsList from './exampleEvents';


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hexColor: string;
}

const ReactBigCalendar = () => {
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

    return (
        <div>
            <Calendar
                localizer={momentLocalizer(moment)}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    )
}

export default ReactBigCalendar;
