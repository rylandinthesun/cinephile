import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LargeMovieCard from '../../components/LargeMovieCard';

jest.mock('firebase', () => {
	return {
		apps      : [
			'testAppId'
		],
		auth      : jest.fn(),
		firestore : jest.fn()
	};
});

describe('LargeMovieCard', () => {
	let expectedProps;

	beforeEach(() => {
		expectedProps = {
			movie : {
				Poster   : 'https://www.movieimage.com.jpg',
				Title    : 'Happy Gilmore',
				imdbID   : 'tt0116483',
				Year     : '1996',
				Runtime  : '92 min',
				Genre    : 'Comedy, Sport',
				Director : 'Dennis Dugan',
				Writer   : 'Tim Herlihy, Adam Sandler',
				Actors   : 'Adam Sandler, Christopher McDonald, Julie Bowen',
				Plot     :
					"A rejected hockey player puts his skills to the golf course to save his grandmother's house."
			}
		};
	});

	test('should render with props', () => {
		render(<LargeMovieCard {...expectedProps} />);

		const image = screen.getByAltText(expectedProps.movie.Title);
		const title = screen.getByText(expectedProps.movie.Title);
		const year = screen.getByText(expectedProps.movie.Year);
		const runtime = screen.getByText(expectedProps.movie.Runtime);
		const actors = screen.getByText(expectedProps.movie.Actors);

		expect(image).toBeVisible();
		expect(title).toBeVisible();
		expect(year).toBeVisible();
		expect(runtime).toBeVisible();
		expect(actors).toBeVisible();
		screen.debug();
	});
});
