import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../../components/NavBar';

describe('NavBar', () => {
	test('should render without crashing', () => {
		render(<NavBar />);
	});
});
