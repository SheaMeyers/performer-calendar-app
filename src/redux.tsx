import { createStore } from "redux";
import { EMAIL_KEY, PERFORMERS_KEY, EVENTS_KEY } from './constants';

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

export interface ReduxState {
    allPerformers: Performer[];
    selectedPerformers: Performer[];
    events: Event[];
    email?: string;
}

const initialState = {
    allPerformers: JSON.parse(localStorage.getItem(PERFORMERS_KEY) || "[]"),
    selectedPerformers: JSON.parse(localStorage.getItem(PERFORMERS_KEY) || "[]"),
    events: JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"),
    email: localStorage.getItem(EMAIL_KEY) || undefined,
};


export type Action = { type: "ADD_SELECTED_PERFORMER"; payload: Performer } | 
                     { type: "ADD_PERFORMERS"; payload: Performer[] } | 
                     { type: "REMOVE_SELECTED_PERFORMER"; payload: string } |
                     { type: "REMOVE_PERFORMER"; payload: string } |
                     { type: "ADD_EVENTS"; payload: Event[] } | 
                     { type: "REMOVE_EVENTS"; payload: string } | 
                     { type: "ADD_EMAIL"; payload: string } |
                     { type: "REMOVE_EMAIL" };


export const performerReducer = (
    state: ReduxState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_SELECTED_PERFORMER": {
            return { ...state, selectedPerformers: [...state.selectedPerformers, action.payload] };
        }
        case "REMOVE_SELECTED_PERFORMER": {
            return { 
                        ...state, 
                        selectedPerformers: state.selectedPerformers.filter(performer => performer.name !== action.payload) 
                    };
        }
        case "ADD_PERFORMERS": {
            return { 
                        ...state, 
                        selectedPerformers: [...state.selectedPerformers, ...action.payload], 
                        allPerformers: [...state.allPerformers, ...action.payload] 
                    };
        }
        case "REMOVE_PERFORMER": {
            return { 
                        ...state, 
                        selectedPerformers: state.selectedPerformers.filter(performer => performer.name !== action.payload), 
                        allPerformers: state.allPerformers.filter(performer => performer.name !== action.payload) 
                    };
        }
        case "ADD_EVENTS": {
            return { ...state, events: [...state.events, ...action.payload] };
        }
        case "REMOVE_EVENTS": {
            return { ...state, events: state.events.filter(event => event.title !== action.payload) };
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
