import { createStore } from "redux";
import bandsList from '../exampleBands';
import { EMAIL_KEY } from '../constants';

export interface BandsState {
    bands: string[];
    email?: string;
}

const initialState = {
    bands: bandsList.map(band => band.name),
    email: localStorage.getItem(EMAIL_KEY) || undefined,
};

export type Action = { type: "ADD_BAND"; payload: string } | 
                     { type: "REMOVE_BAND"; payload: string } |
                     { type: "ADD_EMAIL"; payload: string } |
                     { type: "REMOVE_EMAIL" };

export const bandsReducer = (
    state: BandsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_BAND": {
            return { ...state, bands: [...state.bands, action.payload] };
        }
        case "REMOVE_BAND": {
            return { ...state, bands: state.bands.filter(band => band !== action.payload) };
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

export const store = createStore(bandsReducer);
