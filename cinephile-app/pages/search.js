import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';
import SearchForm from '../components/SearchForm';
import API_KEY from '../API_KEY';
import searchPageStyles from '../styles/SearchPage.module.css';

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

const Search = () => {
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
			if (searchValue) {
				getMovies();
			}
			else {
				setSearchValue('');
			}
		},
		[
			searchValue
		]
	);

	return (
		<div>
			<Head>
				<title>Results for &quot;{searchValue}&quot;</title>
			</Head>
			<div className={searchPageStyles.searchForm}>
				<SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>

			<div className={searchPageStyles.searchContainer}>
				{movies && (
					<div>
						<MovieList movies={movies} />
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Search;
