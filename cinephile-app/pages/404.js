import React from 'react';
import Link from 'next/link';
import { useAuth } from '../firebase/auth';
import notFoundStyles from '../styles/NotFoundStyles.module.css';

const NotFound = () => {
	const { user } = useAuth();

	return (
		<div className={notFoundStyles.notFound}>
			<h2>
				That page <span>cannot be found.</span>
			</h2>
			<p>
				Go back to{' '}
				{user ? (
					<Link href="/dashboard">
						<a>Dashboard</a>
					</Link>
				) : (
					<Link href="/">
						<a>Homepage</a>
					</Link>
				)}
			</p>
		</div>
	);
};

export default NotFound;
