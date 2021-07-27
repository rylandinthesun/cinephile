import React from 'react';
import NavBar from './NavBar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
	return (
		<div>
			<NavBar />
			<div className={styles.container}>
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
