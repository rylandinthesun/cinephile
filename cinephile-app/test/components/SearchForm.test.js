import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from '../../components/SearchForm';

describe('SearchForm', () => {
	let expectedProps;

	beforeEach(() => {
		expectedProps = {
			value : 'Happy Gilmore'
		};
	});

	test('should render with value prop', () => {
		render(<SearchForm {...expectedProps} />);

		const value = screen.getByPlaceholderText('Start typing a movie name...');

		expect(value).toHaveValue('Happy Gilmore');
	});
});
