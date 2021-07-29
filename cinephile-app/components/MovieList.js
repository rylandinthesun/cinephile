import React from 'react';
import MovieCard from '../components/MovieCard';
import { v4 as uuid } from 'uuid';
import movieListStyles from '../styles/MovieList.module.css';

const MovieList = ({ movies }) => {
	return (
		<div className={movieListStyles.scrollWrapper}>
			{movies.map((m) => <MovieCard title={m.Title} img={m.Poster} year={m.Year} id={m.imdbID} key={uuid()} />)}
		</div>
	);
};

export default MovieList;
