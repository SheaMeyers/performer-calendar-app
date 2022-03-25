import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from "react-redux"
import App from '../components/App';

test('Clicking magnifying glass with no value displays message', () => {
    render(<App />)
    const searchButton = screen.getByRole('button', { name: 'search' });
    userEvent.click(searchButton)
    const errorText = screen.getByText('No value entered')
    expect(errorText).toHaveTextContent('No value entered')
});

test('Clicking magnifying glass with value displays searching message while searching', () => {
    render(<App />)
    const searchField = screen.getByRole('textbox');
    userEvent.type(searchField, 'Korn')
    const searchButton = screen.getByRole('button', { name: 'search' });
    userEvent.click(searchButton)
    const searchResult = screen.getByText('Searching...')
    expect(searchResult).toHaveTextContent('Searching...')
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

test('Clicking modal close closes modal and does not add artist', async () => {
    render(<App />)
    const searchField = screen.getByRole('textbox');
    userEvent.type(searchField, 'Korn')
    const searchButton = screen.getByRole('button', { name: 'search' });

    await waitFor(async () => {
        act(() => {
            userEvent.click(searchButton)
        }) 
        const closeButton = screen.getByRole('button', { name: 'Close' })
        userEvent.click(closeButton)
        expect(screen.queryByText('Korn')).not.toBeInTheDocument()
    })
});

test('Clicking entry in modal adds artist to performer list', async () => {
    render(<App />)
    const searchField = screen.getByRole('textbox');
    userEvent.type(searchField, 'Korn')
    const searchButton = screen.getByRole('button', { name: 'search' });

    await waitFor(async () => {
        act(() => {
            userEvent.click(searchButton)
        }) 
        const searchResult = screen.getByText('Korn')
        userEvent.click(searchResult)
        expect(screen.queryByText('Korn')).toBeInTheDocument()
    })
});

test.only('Clicking checkmark removes event from calendar', () => {
    render(<App />)
    const dispatch = useDispatch()
    dispatch({ type: "ADD_PERFORMERS", payload: [{ id: 1, name: 'Korn', hexColor: '#000000'}] })
    const mockEvents = [{ 
        id: 1, 
        name: 'Korn', 
        hexColor: '#000000',
        start: new Date(),
        end: new Date(),
        url: 'http://test.com'
    }]
    dispatch({ type: "ADD_EVENTS", payload: mockEvents })
    expect(screen.getByTitle('Korn')).toBeInTheDocument()
})
