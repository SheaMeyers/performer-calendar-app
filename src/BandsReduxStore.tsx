import { createStore } from "redux";

export interface BandsState {
    bands: string[];
}

const initialState = {
    bands: [],
};

export type Action = { type: "ADD_BAND"; payload: string };

export const bandsReducer = (
    state: BandsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_BAND": {
            return { ...state, bands: [...state.bands, action.payload] };
        }
        default:
            return state;
    }
};

export  const store = createStore(bandsReducer);
