import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

describe('Homepage', () => {
	test('should render homepage and signin link for non signed in user', () => {
		render(<Home />);
		const signInLink = screen.getByText('Sign In');
		const header = screen.getByRole('heading', { name: 'Cine Phile' });

		expect(signInLink).toBeInTheDocument();
		expect(signInLink).toHaveClass('signIn');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('title');
	});
});
