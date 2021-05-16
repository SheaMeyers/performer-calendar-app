import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from "react-redux";
import { BandsState } from "./BandsReduxStore";
import myEventsList from './exampleEvents';


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hexColor: string;
    seatGeekUrl: string;
    tooltip?: string; 
}

const ReactBigCalendar = () => {

    const bands = useSelector<BandsState, BandsState["bands"]>(
        (state) => state.bands
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
        window.open(event.seatGeekUrl, "_blank");
    }

    return (
        <div>
            <Calendar
                localizer={momentLocalizer(moment)}
                events={myEventsList.filter(event => bands.includes(event.title))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                tooltipAccessor={eventTooltipGetter}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleOnSelectEvent}
            />
        </div>
    )
}

export default ReactBigCalendar;
