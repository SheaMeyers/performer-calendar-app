import { createStore } from "redux";
import performerList from './examplePerformers';
import { EMAIL_KEY, PERFORMERS_KEY, EVENTS_KEY } from './constants';

interface Performer {
    id: number
    name: string
    color: string
}

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hexColor: string;
    url: string;
    tooltip?: string; 
}

export interface PerformerState {
    performers: Performer[];
    events: Event[];
    email?: string;
}

const initialState = {
    performers: JSON.parse(localStorage.getItem(PERFORMERS_KEY) || "[]"),
    events: JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"),
    email: localStorage.getItem(EMAIL_KEY) || undefined,
};


// TODO Need to add actions for:
//   adding events for a single performer
//   removing events for a single performer
export type Action = { type: "ADD_PERFORMER"; payload: Performer } | 
                     { type: "ADD_PERFORMERS"; payload: Performer[] } | 
                     { type: "ADD_EVENTS"; payload: Event[] } | 
                     { type: "REMOVE_PERFORMER"; payload: string } |
                     { type: "ADD_EMAIL"; payload: string } |
                     { type: "REMOVE_EMAIL" };

export const performerReducer = (
    state: PerformerState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_PERFORMER": {
            return { ...state, performers: [...state.performers, action.payload] };
        }
        case "REMOVE_PERFORMER": {
            return { ...state, performers: state.performers.filter(performer => performer.name !== action.payload) };
        }
        case "ADD_PERFORMERS": {
            return { ...state, performers: [...state.performers, ...action.payload] };
        }
        case "ADD_EVENTS": {
            return { ...state, events: [...state.events, ...action.payload] };
        }
        case "ADD_EMAIL": {
            return { ...state, email: action.payload };
        }
        case "REMOVE_EMAIL": {
            return { ...state, email: undefined };
        }
        default:
            return state;
    }
};

export const store = createStore(performerReducer);
