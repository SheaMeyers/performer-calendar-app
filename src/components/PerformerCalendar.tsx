import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useSelector } from "react-redux"
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ReduxState } from "../redux"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Performer, Event } from '../interfaces'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            margin: '1rem'
        }
    }),
)


const PerformerCalendar = () => {

    let events = useSelector<ReduxState, ReduxState["events"]>(
        (state) => state.events
      )
    const selectedPerformers = useSelector<ReduxState, ReduxState["selectedPerformers"]>(
        (state) => state.selectedPerformers
      )
    const performers_titles = selectedPerformers.map((selectedPerformers: Performer) => selectedPerformers.name)

    const eventStyleGetter = (event: Event) => {
        const style = {
            backgroundColor: event.hexColor,
            opacity: 0.8,
            color: 'black',
            border: event.border
        }
        return {
            style: style
        }
    }

    const eventTooltipGetter = (event: Event) => {
        return event.tooltip || event.title
    }

    const handleOnSelectEvent = (event: Event, syntheticEvent: React.SyntheticEvent) => {
        window.open(event.url, "_blank", "noopener")
    }

    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent>
                <Calendar
                    localizer={momentLocalizer(moment)}
                    events={events
                            .filter((event: Event) => performers_titles.includes(event.title))
                            .map((event: Event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
                        }
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

export default PerformerCalendar
