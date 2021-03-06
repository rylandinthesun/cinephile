import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useAuth } from '../firebase/auth';
import homeStyles from '../styles/Home.module.css';

export default function Home () {
	const { user } = useAuth();

	return (
		<div>
			<Head>
				<title>Cinephile App Home</title>
			</Head>

			<div>
				<div className={homeStyles.container}>
					<h1 className={homeStyles.title}>
						Cine<span>Phile</span>
					</h1>
					<p className={homeStyles.description}>
						An app for film fans that lets you rate and review movies while also tracking movies you&apos;ve
						watched or want to watch.
					</p>
					{user && (
						<div className={homeStyles.hello}>
							Hello, <span>{user.displayName}</span>
						</div>
					)}
					<div className={homeStyles.btnDiv}>
						{!user ? (
							<Link href="/signin">
								<button className={homeStyles.signIn}>Sign In</button>
							</Link>
						) : (
							<Link href="/dashboard">
								<button className={homeStyles.signIn}>Go to Dashboard</button>
							</Link>
						)}
					</div>
					{!user && (
						<p className={homeStyles.createdBy}>
							Created by{' '}
							<a href="https://www.rylandoehlers.com" target="_blank" rel="noreferrer">
								Ryland Oehlers
							</a>
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
