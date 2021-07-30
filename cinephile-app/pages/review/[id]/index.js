import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import API_KEY from '../../../API_KEY';
import { useAuth } from '../../../firebase/auth';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuid } from 'uuid';
import reviewStyles from '../../../styles/Review.module.css';

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export async function getServerSideProps ({ query }) {
	const { id } = query;

	const res = await axios.get(`${API_URL}&i=${id}`);
	const movie = res.data;

	return {
		props : {
			movie
		}
	};
}

const Review = ({ movie }) => {
	const { user } = useAuth();
	const db = firebase.firestore();
	const router = useRouter();

	const [
		starValue,
		setStarValue
	] = useState(0);

	const [
		reviewDesc,
		setReviewDesc
	] = useState('');

	const [
		hoverValue,
		setHoverValue
	] = useState(undefined);

	const [
		review,
		setReview
	] = useState([]);

	let stars = Array(5).fill(0);
	if (review) stars = Array(review.rating).fill(0);

	const handleClick = (value) => {
		setStarValue(value);
	};

	const handleMouseOver = (value) => {
		setHoverValue(value);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};

	const getReviewDesc = (e) => {
		const review = e.target.value;
		setReviewDesc(review);
	};

	const getReview = () => {
		db.collection('users').doc(user.uid).collection('reviews').onSnapshot((snapshot) => {
			const userData = [];
			snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
			const findIfWatched = userData.find((f) => f.imdb_id === movie.imdbID);
			setReview(findIfWatched);
		});
	};

	const addReview = () => {
		if (user) {
			db.collection('users').doc(user.uid).collection('reviews').add({
				imdb_id     : movie.imdbID,
				movie_title : movie.Title,
				movie_image : movie.Poster,
				rating      : starValue,
				review      : reviewDesc,
				createdAt   : firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		else {
			console.log('Must be user to add a review.');
		}
	};

	const removeReview = () => {
		if (review) {
			db
				.collection('users')
				.doc(user.uid)
				.collection('reviews')
				.doc(review.id)
				.delete()
				.then(() => {
					console.log('Success');
				})
				.catch((error) => {
					console.error('Error', error);
				});
		}
	};

	const reRoute = async () => {
		await router.push('/');
	};

	useEffect(() => {
		if (!user) {
			reRoute();
		}
		else {
			getReview();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>Review for {movie.Title}</title>
			</Head>
			{user && (
				<div className={reviewStyles.container}>
					<div className={reviewStyles.heading}>
						<div>Review for {movie.Title}</div>
						{!review ? (
							<Link href={`/movie/${movie.imdbID}`}>
								<a>
									<IoIosArrowBack />Movie Details
								</a>
							</Link>
						) : (
							<Link href={`/reviews`}>
								<a>
									<IoIosArrowBack />Reviews
								</a>
							</Link>
						)}
					</div>
					<div className={reviewStyles.ratingContainer}>
						{review && (
							<div className={reviewStyles.ratingCard}>
								<div className={reviewStyles.imgStars}>
									{review.movie_image ? (
										<Image
											className={reviewStyles.cardImage}
											src={review.movie_image}
											alt={review.movie_title}
											height={96}
											width={64}
										/>
									) : (
										<Image
											className={reviewStyles.cardImage}
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
											alt={review.movie_title}
											height={96}
											width={64}
										/>
									)}
									<div className={reviewStyles.title}>
										<Link href={`/movie/${review.imdb_id}`}>
											<a>
												Movie Details
												<IoIosArrowForward />
											</a>
										</Link>
										<div className={reviewStyles.stars}>
											{stars.map((i) => {
												return <FaStar key={uuid()} />;
											})}
										</div>
									</div>
								</div>
								{review.review === '' ? null : <p>&quot;{review.review}&quot;</p>}

								<button onClick={() => removeReview()}>Delete Review</button>
							</div>
						)}
						{!review && (
							<div className={reviewStyles.ratingCardForm}>
								<fieldset className={reviewStyles.rating}>
									{stars.map((_, idx) => {
										return (
											<FaStar
												key={idx}
												onClick={() => handleClick(idx + 1)}
												className={
													(hoverValue || starValue) > idx ? (
														`${reviewStyles.hover}`
													) : (
														`${reviewStyles.noHover}`
													)
												}
												onMouseOver={() => handleMouseOver(idx + 1)}
												onMouseLeave={handleMouseLeave}
											/>
										);
									})}
								</fieldset>
								<textarea placeholder="Write a review (optional)" onChange={getReviewDesc} />
								<button onClick={() => addReview()}>Submit</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Review;
