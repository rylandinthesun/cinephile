import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import firebase from 'firebase/app';
import 'firebase/firestore';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import { FaStar, FaSearch } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import DBMovieList from '../components/DBMovieList';
import homeStyles from '../styles/Home.module.css';

const Dashboard = ({ token }) => {
	const db = firebase.firestore();

	const [
		photo,
		setPhoto
	] = useState('');

	const [
		seenMovies,
		setSeenMovies
	] = useState([]);

	const getSeenMovies = async () => {
		await db
			.collection('users')
			.doc(token.uid)
			.collection('seenmovies')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const userData = [];
				snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
				setSeenMovies(userData);
			});
	};

	useEffect(() => {
		if (token) {
			getSeenMovies();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			{token && (
				<div>
					<div className={homeStyles.heading}>
						{token.picture ? (
							<Image
								className={homeStyles.cardImage}
								src={token.picture}
								alt="Avatar"
								height={90}
								width={90}
								layout="fixed"
							/>
						) : (
							<Image
								className={homeStyles.cardImage}
								src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
								alt="Avatar"
								height={90}
								width={90}
								layout="fixed"
							/>
						)}
						<h2>My Dashboard</h2>
					</div>

					<div className={homeStyles.categories}>
						<Link href="/reviews">
							<div className={homeStyles.favorites}>
								<span>Reviews </span>
								<FaStar />
							</div>
						</Link>

						<Link href="/watchlist">
							<div className={homeStyles.wantToWatch}>
								<span>WatchList </span>
								<AiFillEye />
							</div>
						</Link>

						<Link href="/search">
							<div className={homeStyles.search}>
								<span>Search </span>
								<FaSearch />
							</div>
						</Link>
					</div>

					<div className={homeStyles.myMoviesTitle}>
						<h2>My Movies</h2>
					</div>

					<div className={homeStyles.movieList}>
						{seenMovies ? <DBMovieList movies={seenMovies} /> : <p>Start searching to add movies!</p>}
					</div>
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

export default Dashboard;
