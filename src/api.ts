import axios from "axios"
import { Performer, ShowPerformer, Event } from "./interfaces"

export const SEATGEEK_ENDPOINT = 'https://api.seatgeek.com/2/'

// Note: While having an API Key publicly available is generally a bad practice, 
//   this is a free key that anyone can get from SeatGeek and so there is really
//   no point in stealing it.  This also allows anyone cloning the repo to more
//   easily test the code out.
export const SEATGEEK_APIKEY = 'MjE5Mjg3MTN8MTYyMTA3ODMzNC40NDc3NDI1'

export const getPerformers = async (query: string) => {
    try {
        const response = await axios.get(`${SEATGEEK_ENDPOINT}performers?q=${query}&client_id=${SEATGEEK_APIKEY}`)
        return response.data.performers.map((performer: any): ShowPerformer => { 
            return { 
                id: performer.id,
                name: performer.name,
                hexColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                showCheckbox: true
            }
        })
    } catch (e) {
        return []
    }
}

export const getPerformerEvents = async (performer: Performer) => {
    try {
        const response = await axios.get(`${SEATGEEK_ENDPOINT}events?performers.id=${performer.id}&client_id=${SEATGEEK_APIKEY}`)
        return response.data.events.map((event: any): Event => {
            return {
                id: event.id,
                title: performer.name,
                start: event.datetime_local,
                end: event.datetime_local.split('T')[0] + 'T23:59:59',
                hexColor: performer.hexColor,
                url: event.url
            }
        })
    } catch (e) {
        return []
    }
}
