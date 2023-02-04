import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import addClass from 'dom-helpers/addClass'
import removeClass from 'dom-helpers/removeClass'
import getWidth from 'dom-helpers/width'
import scrollbarSize from 'dom-helpers/scrollbarSize'

import { navigate } from './utils/constants'
import * as dates from './utils/dates'
import { inRange } from './utils/eventLevels'
import { isSelected } from './utils/selection'
import { Event } from '../interfaces'

interface AgendaInterface {
  selected: any
  getters: any
  accessors: any
  localizer: any
  components: any
  length: number
  date: any
  events: Event[]
}

const Agenda = ({
  selected,
  getters,
  accessors,
  localizer,
  components,
  length,
  date,
  events,
}: AgendaInterface) => {
  const headerRef = useRef<HTMLTableElement>(null)
  const dateColRef = useRef<HTMLTableCellElement>(null)
  const timeColRef = useRef<HTMLTableCellElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tbodyRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    _adjustHeader()
  })

  const renderDay = (day: any, events: Event[], dayKey: any) => {
    const { event: Event, date: AgendaDate } = components

    events = events.filter(e =>
      inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
    )

    return events.map((event: Event, idx) => {
      const title = accessors.title(event)
      const end = accessors.end(event)
      const start = accessors.start(event)

      const userProps = getters.eventProp(
        event,
        start,
        end,
        isSelected(event, selected)
      )

      const dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat')
      const first =
        idx === 0 ? (
          <td rowSpan={events.length} className="rbc-agenda-date-cell">
            {AgendaDate ? (
              <AgendaDate day={day} label={dateLabel} />
            ) : (
              dateLabel
            )}
          </td>
        ) : (
          false
        )

      return (
        <tr
          key={dayKey + '_' + idx}
          className={userProps.className}
          style={{...userProps.style, cursor: 'pointer'}}
          onClick={() => window.open(event.url, "_blank")}
        >
            {first}
            <td className="rbc-agenda-time-cell">{timeRangeLabel(day, event)}</td>
            <td className="rbc-agenda-event-cell">
              {Event ? <Event event={event} title={title} /> : title}
            </td>
            <td>{event.location}</td>
        </tr>
      )
    }, [])
  }

  const timeRangeLabel = (day: any, event: Event) => {
    let labelClass = '',
      TimeComponent = components.time,
      label = localizer.messages.allDay

    const end = accessors.end(event)
    const start = accessors.start(event)

    if (!accessors.allDay(event)) {
      if (dates.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(start, end, 'day')) {
        label = localizer.format({ start, end }, 'agendaTimeRangeFormat')
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, 'agendaTimeFormat')
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? (
          <TimeComponent event={event} day={day} label={label} />
        ) : (
          label
        )}
      </span>
    )
  }

  const _adjustHeader = () => {
    if (
      !tbodyRef.current ||
      !tbodyRef.current.firstChild ||
      !contentRef.current ||
      !dateColRef.current ||
      !timeColRef.current ||
      !headerRef.current
    )
      return;

    const header = headerRef.current
    const firstRow = (tbodyRef.current.firstChild as HTMLTableRowElement)

    const isOverflowing =
      contentRef.current.scrollHeight > contentRef.current.clientHeight

    let _widths: number[] = []
    const widths = _widths

    _widths = [getWidth((firstRow.children[0] as HTMLElement)), getWidth((firstRow.children[1] as HTMLElement))]

    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = _widths[0] + 'px'
      timeColRef.current.style.width = _widths[1] + 'px'
    }

    if (isOverflowing) {
      addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      removeClass(header, 'rbc-header-overflowing')
    }
  }

  const { messages } = localizer
  const end = dates.add(date, length, 'day')

  const range = dates.range(date, end, 'day')

  events = events.filter(event => inRange(event, date, end, accessors))

  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  return (
    <div className="rbc-agenda-view">
      {events.length !== 0 ? (
        <React.Fragment>
          <table ref={headerRef} className="rbc-agenda-table">
            <thead>
              <tr>
                <th className="rbc-header" ref={dateColRef}>
                  {messages.date}
                </th>
                <th className="rbc-header" ref={timeColRef}>
                  {messages.time}
                </th>
                <th className="rbc-header">{messages.event}</th>
                <th className="rbc-header">Location</th>
              </tr>
            </thead>
          </table>
          <div className="rbc-agenda-content" ref={contentRef}>
            <table className="rbc-agenda-table">
              <tbody ref={tbodyRef}>
                {range.map((day, idx) => renderDay(day, events, idx))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ) : (
        <span className="rbc-agenda-empty">{messages.noEventsInRange}</span>
      )}
    </div>
  )
}

Agenda.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),
  length: PropTypes.number.isRequired,

  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}

Agenda.defaultProps = {
  length: 30,
}

Agenda.range = (start: any, { length = Agenda.defaultProps.length }) => {
  const end = dates.add(start, length, 'day')
  return { start, end }
}

Agenda.navigate = (date: any, action: any, { length = Agenda.defaultProps.length }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -length, 'day')

    case navigate.NEXT:
      return dates.add(date, length, 'day')

    default:
      return date
  }
}

Agenda.title = (date: any, options: any) => {
  return 'Agenda'
}

export default Agenda
