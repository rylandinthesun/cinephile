import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewCard from '../../components/ReviewCard';

describe('ReviewCard', () => {
	test('should render card with props', () => {
		render(
			<ReviewCard
				img="https://www.movieimage.com.jpg"
				title="Happy Gilmore"
				rating="5"
				review="really good I like"
				id="tt0116483"
			/>
		);
		const image = screen.getByAltText('Happy Gilmore');
		const title = screen.getByText('Happy Gilmore');
		const review = screen.getByRole('heading', { name: /really good I like/i });
		const rating = screen.getByTestId('5');

		expect(image).toBeVisible();
		expect(title).toBeVisible();
		expect(review).toBeVisible();
		expect(rating).toBeVisible();
	});
});
