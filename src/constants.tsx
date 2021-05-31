import axios from 'axios';
import history from './history';
import { store } from './redux';

const BACKEND_URL = 'http://localhost:8000';

const BACKEND_KEY = 'backendApiKey';
const EMAIL_KEY = 'userEmail';

const handleLogout = () => {
    axios.post(`${BACKEND_URL}/backend/rest-auth/logout/`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
        }
    }).then(_ => {
        localStorage.removeItem(BACKEND_KEY);
        localStorage.removeItem(EMAIL_KEY);
        store.dispatch({ type: "LOGOUT" });
        history.replace('/');
    }).catch(_ => {
        localStorage.removeItem(BACKEND_KEY);
        localStorage.removeItem(EMAIL_KEY);
        store.dispatch({ type: "LOGOUT" });
        history.replace('/');
    })
}

const getInfo = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/backend/get-info/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem(BACKEND_KEY)}`
            }
        })

        store.dispatch({ type: "ADD_PERFORMERS", payload: response.data.performers });
        store.dispatch({ type: "ADD_EVENTS", payload: response.data.events });
    } catch (err) {
        // Do nothing
    }
};


export { BACKEND_URL, BACKEND_KEY, EMAIL_KEY, handleLogout, getInfo };
