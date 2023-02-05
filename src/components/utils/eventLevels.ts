import { Event } from '../../interfaces'
import * as dates from './dates'

export const inRange = (event: Event, start: Date, end: Date, accessors: any): boolean => {
  let eStart = dates.startOf(accessors.start(event), 'day')
  let eEnd = accessors.end(event)

  let startsBeforeEnd = dates.lte(eStart, end, 'day')
  // when the event is zero duration we need to handle a bit differently
  let endsAfterStart = !dates.eq(eStart, eEnd, 'minutes')
    ? dates.gt(eEnd, start, 'minutes')
    : dates.gte(eEnd, start, 'minutes')

  return startsBeforeEnd && endsAfterStart
}