import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import firebase from 'firebase';
import 'firebase/firestore';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import ReviewList from '../components/ReviewList';
import reviewStyles from '../styles/Reviews.module.css';

const reviews = ({ token }) => {
	const db = firebase.firestore();
	const { uid } = token;

	const [
		reviews,
		setReviews
	] = useState([]);

	const getReviews = async () => {
		await db
			.collection('users')
			.doc(uid)
			.collection('reviews')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const userData = [];
				snapshot.forEach((doc) => userData.push({ ...doc.data(), id: doc.id }));
				setReviews(userData);
			});
	};

	useEffect(() => {
		if (uid) {
			getReviews();
		}
	}, []);

	return (
		<div>
			<Head>
				<title>My Reviews</title>
			</Head>
			{!uid && (
				<div className={reviewStyles.container}>
					<h1>Loading...</h1>
				</div>
			)}
			{uid && (
				<div>
					<div className={reviewStyles.heading}>
						<div>My Reviews</div>
						<Link href="/dashboard">
							<a>
								<IoIosArrowBack />Back to Dashboard
							</a>
						</Link>
					</div>
					{reviews && (
						<div className={reviewStyles.movieContainer}>
							{reviews.length > 0 ? (
								<div>
									<ReviewList movies={reviews} />
								</div>
							) : (
								<div className={reviewStyles.noResultsContainer}>
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

export default reviews;
