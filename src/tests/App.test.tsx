import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from "react-modal"
import App from '../components/App';

beforeEach(() => {
    Modal.setAppElement = () => null
})

test('Clicking magnifying glass with no value does nothing', async () => {
    render(<App />)
    const searchButton = screen.getByRole('button', { name: 'search' });
    userEvent.click(searchButton)
    
    await waitFor(async () => {
        act(() => {
            userEvent.click(searchButton)
        }) 
        const searchResult = screen.queryByText('Korn')
        expect(searchResult).toBeNull()
    })
});

test('Clicking magnifying glass with value displays values after response is returned', async () => {
    render(<App />)
    const searchField = screen.getByRole('textbox');
    userEvent.type(searchField, 'Korn')
    const searchButton = screen.getByRole('button', { name: 'search' });

    await waitFor(async () => {
        act(() => {
            userEvent.click(searchButton)
        }) 
        const searchResult = screen.getByText('Korn')
        expect(searchResult).toHaveTextContent('Korn')
    })
});
