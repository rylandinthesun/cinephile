import { FaImdb } from 'react-icons/fa';
import { AiOutlineEye, AiFillEye } from 'react-icons/ai';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuth } from '../firebase/auth';
import largeCardStyles from '../styles/LargeMovieCard.module.css';

const LargeMovieCard = ({ movie }) => {
	const db = firebase.firestore();

	const { user } = useAuth();

	const [
		userSeen,
		setUserSeen
	] = useState([]);

	const [
		userWatched,
		setUserWatched
	] = useState([]);

	const [
		review,
		setReview
	] = useState([]);

	const [
		isShown,
		setIsShown
	] = useState(false);

	const [
		isShown2,
		setIsShown2
	] = useState(false);

	const handleAddSeen = () => {
		if (db) {
			db.collection('users').doc(user.uid).collection('seenmovies').add({
				imdb_id     : movie.imdbID,
				movie_title : movie.Title,
				movie_image : movie.Poster,
				createdAt   : firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		handleRemoveWatchList();
	};

	const handleRemoveSeen = () => {
		if (userSeen) {
			db
				.collection('users')
				.doc(user.uid)
				.collection('seenmovies')
				.doc(userSeen.id)
				.delete()
				.then(() => {
					console.log('Success');
				})
				.catch((error) => {
					console.error('Error', error);
				});
		}
	};

	const handleAddToWatchList = () => {
		if (db) {
			db.collection('users').doc(user.uid).collection('watchlist').add({
				imdb_id     : movie.imdbID,
				movie_title : movie.Title,
				movie_image : movie.Poster,
				createdAt   : firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		handleRemoveSeen();
	};

	const handleRemoveWatchList = () => {
		if (userWatched) {
			db
				.collection('users')
				.doc(user.uid)
				.collection('watchlist')
				.doc(userWatched.id)
				.delete()
				.then(() => {
					console.log('Success');
				})
				.catch((error) => {
					console.error('Error', error);
				});
		}
	};

	const getSeenMovie = () => {
		db.collection('users').doc(user.uid).collection('seenmovies').onSnapshot((snapshot) => {
			const userData = [];
			snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
			const findIfSeen = userData.find((f) => f.imdb_id === movie.imdbID);
			setUserSeen(findIfSeen);
		});
	};

	const getWatchList = () => {
		db.collection('users').doc(user.uid).collection('watchlist').onSnapshot((snapshot) => {
			const userData = [];
			snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
			const findIfWatched = userData.find((f) => f.imdb_id === movie.imdbID);
			setUserWatched(findIfWatched);
		});
	};

	const getReview = () => {
		db.collection('users').doc(user.uid).collection('reviews').onSnapshot((snapshot) => {
			const userData = [];
			snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
			const findIfWatched = userData.find((f) => f.imdb_id === movie.imdbID);
			setReview(findIfWatched);
		});
	};

	useEffect(() => {
		if (user) {
			getSeenMovie();
			getWatchList();
			getReview();
		}
	}, []);

	return (
		<div key={movie.imdbID} className={largeCardStyles.movieCard}>
			<div className={largeCardStyles.title}>
				<div>
					{movie.Poster == 'N/A' ? (
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
							alt="Movie Poster"
						/>
					) : (
						<img src={movie.Poster} alt="Movie Poster" loading="lazy" />
					)}
				</div>
				<div className={largeCardStyles.titleInfo}>
					<div className={largeCardStyles.nameImdb}>
						<div className={largeCardStyles.name}>{movie.Title}</div>
						<div className={largeCardStyles.link}>
							<a
								className={largeCardStyles.imdb}
								href={`https://imdb.com/title/${movie.imdbID}`}
								target="_blank"
							>
								<FaImdb />
							</a>
						</div>
					</div>
					<div className={largeCardStyles.yearTime}>
						<div className={largeCardStyles.year}>{movie.Year}</div>
						<div className={largeCardStyles.runtime}>{movie.Runtime}</div>
					</div>
					<div className={largeCardStyles.genre}>
						{movie.Genre ? (
							movie.Genre.split(', ').map((g) => <div className={largeCardStyles.genreName}>{g}</div>)
						) : (
							movie.Genre
						)}
					</div>
				</div>
			</div>
			<div className={largeCardStyles.plot}>
				<div>"{movie.Plot}"</div>
			</div>
			<div className={largeCardStyles.creditSection}>
				<div className={largeCardStyles.creditTitle}>Director:</div>
				<div className={largeCardStyles.creditNames}>
					{movie.Director ? movie.Director.split(',').slice(0, 3).join(', ') : movie.Director}
				</div>
			</div>
			<div className={largeCardStyles.creditSection}>
				<div className={largeCardStyles.creditTitle}>Writers:</div>
				<div className={largeCardStyles.creditNames}>
					{movie.Writer ? movie.Writer.split(',').slice(0, 3).join(', ') : movie.Writer}
				</div>
			</div>
			<div className={largeCardStyles.creditSection}>
				<div className={largeCardStyles.creditTitle}>Staring:</div>
				<div className={largeCardStyles.creditNames}>
					{movie.Actors ? movie.Actors.split(',').slice(0, 5).join(', ') : movie.Actors}
				</div>
			</div>
			<div className={largeCardStyles.clickables}>
				{user && (
					<div>
						{userWatched && (
							<button
								onClick={() => handleRemoveWatchList()}
								className={largeCardStyles.addWatchFill}
								onMouseEnter={() => setIsShown2(true)}
								onMouseLeave={() => setIsShown2(false)}
							>
								<AiFillEye />
								{isShown2 && <span>Remove from watch list</span>}
							</button>
						)}
						{!userWatched && (
							<button
								onClick={() => handleAddToWatchList()}
								className={largeCardStyles.addWatch}
								onMouseEnter={() => setIsShown2(true)}
								onMouseLeave={() => setIsShown2(false)}
							>
								<AiOutlineEye />
								{isShown2 && <span>Add to watch list</span>}
							</button>
						)}

						{userSeen && !review ? (
							<div className={largeCardStyles.review}>
								<Link href={`/review/${userSeen.imdb_id}`}>Write a review</Link>
							</div>
						) : userSeen && review ? (
							<div className={largeCardStyles.review}>
								<Link href={`/review/${review.imdb_id}`}>My Review</Link>
							</div>
						) : null}

						{userSeen && (
							<button
								onClick={() => handleRemoveSeen()}
								className={largeCardStyles.addSeenFill}
								onMouseEnter={() => setIsShown(true)}
								onMouseLeave={() => setIsShown(false)}
							>
								<FaCheckCircle />
								{isShown && <span>Remove from seen</span>}
							</button>
						)}
						{!userSeen && (
							<button
								onClick={() => handleAddSeen()}
								className={largeCardStyles.addSeen}
								onMouseEnter={() => setIsShown(true)}
								onMouseLeave={() => setIsShown(false)}
							>
								<FaRegCheckCircle />
								{isShown && <span>Add to seen</span>}
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default LargeMovieCard;
