import axios from "axios"
import { Event } from "./interfaces"

export const TICKETMASTER_ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/'

// Note: While having an API Key publicly available is generally a bad practice, 
//   this is a free key that anyone can get from Ticketmaster and so there is really
//   no point in stealing it.  This also allows anyone cloning the repo to more
//   easily test the code out.
export const TICKETMASTER_APIKEY = 'OIcjO8xAGvyfG7rv47wVPnh5O3IdCO4G'


export const getEvents = async (keyword: string, hexColor: string): Promise<Event[]> => {
    const events: Event[] = []
    try {
        const response = await axios.get(`${TICKETMASTER_ENDPOINT}events.json?keyword=${keyword}&apikey=${TICKETMASTER_APIKEY}`)
        response.data._embedded.events.forEach((event: any): void => {
            events.push({
                id: event.id,
                title: event.name,
                start: event.dates.start.dateTime,
                end: event.dates.start.dateTime.split('T')[0] + 'T23:59:59',
                hexColor,
                url: event.url
            })
        })
    } catch (e) { }
    return events
}
