import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import firebase from 'firebase';
import 'firebase/firestore';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import DBMovieList from '../components/DBMovieList';
import watchStyles from '../styles/Reviews.module.css';

const watchlist = ({ token }) => {
	const db = firebase.firestore();
	const { uid } = token;

	const [
		watchList,
		setWatchList
	] = useState([]);

	const getWatchList = async () => {
		await db
			.collection('users')
			.doc(uid)
			.collection('watchlist')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const userData = [];
				snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
				setWatchList(userData);
			});
	};

	useEffect(() => {
		if (uid) {
			getWatchList();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>My Watch List</title>
			</Head>
			{!token && (
				<div className={watchStyles.container}>
					<h1>Loading...</h1>
				</div>
			)}
			{uid && (
				<div>
					<div className={watchStyles.heading}>
						<div>My Watch List</div>
						<Link href="/dashboard">
							<a>
								<IoIosArrowBack />Back to Dashboard
							</a>
						</Link>
					</div>
					{watchList && (
						<div className={watchStyles.movieContainer}>
							{watchList.length > 0 ? (
								<div>
									<DBMovieList movies={watchList} />
								</div>
							) : (
								<div className={watchStyles.noResultsContainer}>
									Start <Link href="/search">searching</Link> for movies to add to this collection.
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export async function getServerSideProps (context) {
	try {
		const cookies = nookies.get(context);
		const token = await verifyIdToken(cookies.token);

		return {
			props : { token }
		};
	} catch (err) {
		context.res.writeHead(302, { Location: '/signin' }).end();
		context.res.end();
		return {
			props : []
		};
	}
}

export default watchlist;
