import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DBMovieCard from '../../components/DBMovieCard';

describe('DBMovieCard', () => {
	let expectedProps;

	beforeEach(() => {
		expectedProps = {
			img   : 'https://www.movieimage.com.jpg',
			title : 'Happy Gilmore'
		};
	});

	test('should render card with image prop', () => {
		render(<DBMovieCard {...expectedProps} />);
		const image = screen.getByAltText(expectedProps.title);

		expect(image).toBeVisible();
	});
});
