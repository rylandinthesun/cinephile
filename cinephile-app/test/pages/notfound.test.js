import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../../pages/404';

describe('404 page', () => {
	test('should render 404 page and homepage link for non signed in user', () => {
		render(<NotFound />);
		const homepageLink = screen.getByRole('link', { name: 'Homepage' });
		const header = screen.getByRole('heading', { name: 'That page cannot be found.' });

		expect(homepageLink).toBeInTheDocument();
		expect(header).toBeInTheDocument();
	});
});
