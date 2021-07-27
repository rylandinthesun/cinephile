import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

test('should render homepage and signin link', () => {
	render(<Home />);
	const signInLink = screen.getByText('Sign In');
	expect(signInLink).toBeInTheDocument();
});
