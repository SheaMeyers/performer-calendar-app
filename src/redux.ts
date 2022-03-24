import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Performer, Event } from './interfaces';


const persistConfig = {
    key: 'root',
    storage,
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
};


export type Action = 
{ type: "ADD_SELECTED_PERFORMER"; payload: Performer } |
{ type: "ADD_PERFORMERS"; payload: Performer[] } |
{ type: "REMOVE_SELECTED_PERFORMER"; payload: string } |
{ type: "REMOVE_PERFORMER"; payload: string } |
{ type: "ADD_EVENTS"; payload: Event[] } |
{ type: "REMOVE_EVENTS"; payload: string };


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
            events.forEach(event => {
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            });
            return { ...state, events: [...state.events, ...events] };
        }
        case "REMOVE_EVENTS": {
            return { ...state, events: state.events.filter(event => event.title !== action.payload) };
        }
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, performerReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
