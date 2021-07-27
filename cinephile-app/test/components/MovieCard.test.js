import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../../components/MovieCard';

describe('MovieCard', () => {
	let expectedProps;

	beforeEach(() => {
		expectedProps = {
			img   : 'https://www.movieimage.com.jpg',
			title : 'Happy Gilmore',
			year  : '1996',
			id    : 'tt0116483'
		};
	});

	test('should render card with props', () => {
		render(<MovieCard {...expectedProps} />);
		const image = screen.getByAltText(expectedProps.title);
		const title = screen.getByText(expectedProps.title);
		const year = screen.getByText(expectedProps.year);

		expect(image).toBeVisible();
		expect(title).toBeVisible();
		expect(year).toBeVisible();
	});
});
