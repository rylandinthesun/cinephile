import Head from 'next/head';
import Link from 'next/link';
import firebase from 'firebase';
import 'firebase/firestore';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import { FaStar, FaSearch } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { useAuth } from '../firebase/auth';
import { useEffect, useState } from 'react';
import ReviewList from '../components/ReviewList';
import homeStyles from '../styles/Home.module.css';
import DBMovieList from '../components/DBMovieList';

const dashboard = ({ token }) => {
	const { user } = useAuth();
	const db = firebase.firestore();

	const [
		name,
		setName
	] = useState('');
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

	const getName = () => {
		if (!token.name) {
			const name = user.displayName;
			setName(name);
		}
		else {
			setName(token.name);
		}
	};

	const getPhoto = () => {
		if (!token.picture) {
			const pic =
				'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg';
			setPhoto(pic);
		}
		else {
			setPhoto(token.picture);
		}
	};

	useEffect(() => {
		if (token) {
			getName();
			getPhoto();
			getSeenMovies();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>{name}'s Dashboard</title>
			</Head>
			{token && (
				<div>
					<div className={homeStyles.heading}>
						<img src={photo} alt="profile avatar" />
						<div>{name}'s Dashboard</div>
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

export default dashboard;