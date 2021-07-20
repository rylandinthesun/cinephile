import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';
import SearchForm from '../components/SearchForm';
import API_KEY from '../API_KEY';
import searchPageStyles from '../styles/SearchPage.module.css';

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const search = () => {
	const [
		movies,
		setMovies
	] = useState([]);

	const [
		searchValue,
		setSearchValue
	] = useState('');

	const getMovies = async () => {
		try {
			const res = await axios.get(`${API_URL}&s=${searchValue}`);
			const query = res.data;
			setMovies(query.Search);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(
		() => {
			getMovies();
		},
		[
			searchValue
		]
	);

	return (
		<div>
			<Head>
				<title>Results for "{searchValue}"</title>
			</Head>
			<div className={searchPageStyles.searchForm}>
				<SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>

			<div className={searchPageStyles.searchContainer}>
				{movies ? (
					<div>
						<MovieList movies={movies} />
					</div>
				) : null}
			</div>
			<Footer />
		</div>
	);
};

export default search;
