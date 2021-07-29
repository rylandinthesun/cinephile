import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '../../firebase/auth';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

jest.mock('../../firebase/auth');

describe('Homepage', () => {
	let expectedSignIn;

	beforeEach(() => {
		expectedSignIn = jest.fn();

		useAuth.mockReturnValue({
			signin : expectedSignIn,
			userId : 123
		});
	});

	test('should render homepage and signin link for non signed in user', async () => {
		render(<Home />);
		const signInLink = screen.getByText('Sign In');
		const header = screen.getByRole('heading', { name: 'Cine Phile' });

		expect(signInLink).toBeInTheDocument();
		expect(signInLink).toHaveClass('signIn');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('title');
	});
});
