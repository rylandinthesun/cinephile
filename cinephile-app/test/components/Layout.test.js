import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../components/Layout';

describe('Layout', () => {
	test('should render without crashing', () => {
		render(<Layout />);
	});
});
