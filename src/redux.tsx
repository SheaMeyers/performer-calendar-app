import { createStore } from "redux";
import performerList from './examplePerformers';
import { EMAIL_KEY } from './constants';

export interface PerformerState {
    performers: string[];
    email?: string;
}

const initialState = {
    performers: performerList.map(performer => performer.name),
    email: localStorage.getItem(EMAIL_KEY) || undefined,
};

export type Action = { type: "ADD_PERFORMER"; payload: string } | 
                     { type: "REMOVE_PERFORMER"; payload: string } |
                     { type: "ADD_EMAIL"; payload: string } |
                     { type: "REMOVE_EMAIL" };

export const performerReducer = (
    state: PerformerState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_PERFORMER": {
            return { ...state, performer: [...state.performers, action.payload] };
        }
        case "REMOVE_PERFORMER": {
            return { ...state, performer: state.performers.filter(performer => performer !== action.payload) };
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
