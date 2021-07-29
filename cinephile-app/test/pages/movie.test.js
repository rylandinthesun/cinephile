import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Movie from '../../pages/movie/[id]/index';

jest.mock('firebase', () => {
	return {
		apps      : [
			'testAppId'
		],
		auth      : jest.fn(),
		firestore : jest.fn()
	};
});

describe('Movie ID page', () => {
	let expectedProps;

	beforeEach(() => {
		expectedProps = {
			movie : {
				Title : 'Happy Gilmore'
			}
		};
	});

	test('should render movie page for non signed in user', () => {
		render(<Movie {...expectedProps} />);
		const header = screen.getByText('Movie Details');
		const searchLink = screen.getByText('Search');

		expect(header).toBeInTheDocument();
		expect(searchLink).toBeInTheDocument();
		expect(searchLink).toHaveClass('search');
	});
});
