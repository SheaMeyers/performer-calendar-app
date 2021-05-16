import { createStore } from "redux";
import bandsList from './exampleBands';

export interface BandsState {
    bands: string[];
}

const initialState = {
    bands: bandsList.map(band => band.name),
};

export type Action = { type: "ADD_BAND"; payload: string } | { type: "REMOVE_BAND"; payload: string };

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
        default:
            return state;
    }
};

export  const store = createStore(bandsReducer);
