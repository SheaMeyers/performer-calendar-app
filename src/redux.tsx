import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { EMAIL_KEY } from './constants';


const persistConfig = {
    key: 'root',
    storage,
}


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
    allPerformers: [],
    selectedPerformers: [],
    events: [],
    email: localStorage.getItem(EMAIL_KEY) || undefined,
};


export type Action = { type: "ADD_SELECTED_PERFORMER"; payload: Performer } |
{ type: "ADD_PERFORMERS"; payload: Performer[] } |
{ type: "REMOVE_SELECTED_PERFORMER"; payload: string } |
{ type: "REMOVE_PERFORMER"; payload: string } |
{ type: "ADD_EVENTS"; payload: Event[] } |
{ type: "REMOVE_EVENTS"; payload: string } |
{ type: "ADD_EMAIL"; payload: string } |
{ type: "LOGOUT" };


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
            const events = action.payload;
            // Convert to date objects
            events.map(event => {
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            });
            return { ...state, events: [...state.events, ...events] };
        }
        case "REMOVE_EVENTS": {
            return { ...state, events: state.events.filter(event => event.title !== action.payload) };
        }
        case "ADD_EMAIL": {
            return { ...state, email: action.payload };
        }
        case "LOGOUT": {
            return { ...state, email: undefined, events: [], selectedPerformers: [], allPerformers: [] };
        }
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, performerReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
