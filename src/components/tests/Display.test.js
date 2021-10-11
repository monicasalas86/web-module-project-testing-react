import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow.js');

import Display from '../Display';


const testShow = {
    //add in approprate test data structure here.
    name: 'Test Show',
    seasons: [
        {
            id: 0,
            name: 'Test Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Test Season 2',
            episodes: []
        },
        {
            id: 2,
            name: 'Test Season 3',
            episodes: []
        },
        {
            id: 3,
            name: 'Test Season 4',
            episodes: []
        },
    ],
    summary: 'Test Summary',
}

test('renders without errors', () => {
    render(<Display/>);
})

test('When fetch button is pressed, show component will display', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const showContainer = await screen.findByTestId('show-container');

    expect(showContainer).toBeInTheDocument();
})

test('when fetch button is pressed, amount of selected options rendered is equal to amount of seasons in test data', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})








///Tasks:
// 1. Add in nessisary imports and values to establish the testing suite. ✔️
//2. Test that the Display component renders without any passed in props. ✔️
//3. Rebuild or copy a show test data element as used in the previous set of tests. ✔️
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test. ✔️
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.