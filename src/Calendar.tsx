import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import myEventsList from './exampleEvents';


const ReactBigCalendar = () => {
    return (
        <div>
            <Calendar
                localizer={momentLocalizer(moment)}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}

export default ReactBigCalendar;
