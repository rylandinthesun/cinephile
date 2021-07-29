import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../../pages/search';

describe('Search page', () => {
	test('should render search page for non signed in user', () => {
		const setSearchValue = jest.fn((value) => {});
		render(<Search setSearchValue={setSearchValue} />);
		const searchInput = screen.getByPlaceholderText('Start typing a movie name...');

		expect(searchInput).toBeInTheDocument();

		fireEvent.change(searchInput, { target: { value: 'Happy Gilmore' } });
		expect(searchInput.value).toBe('Happy Gilmore');
	});
});
