import axios from 'axios';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LargeMovieCard from '../../../components/LargeMovieCard';
import API_KEY from '../../../API_KEY';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../firebase/auth';
import moviePageStyles from '../../../styles/MoviePage.module.css';

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

const Movie = ({ movie }) => {
	const { user } = useAuth();

	return (
		<div>
			<Head>
				<title>{movie.Title}</title>
			</Head>
			<div className={moviePageStyles.container}>
				<div className={moviePageStyles.heading}>
					<div>Movie Details</div>
					<div className={moviePageStyles.btnContainer}>
						<Link href="/search">
							<a className={moviePageStyles.search}>
								<IoIosArrowBack />Search
							</a>
						</Link>
						{user && (
							<Link href={'/dashboard'}>
								<a className={moviePageStyles.dashboard}>
									<IoIosArrowBack />Dashboard
								</a>
							</Link>
						)}
					</div>
				</div>
				<div className={moviePageStyles.cardContainer}>
					{!movie ? <div>Loading...</div> : <LargeMovieCard movie={movie} />}
				</div>
			</div>
		</div>
	);
};

export default Movie;
