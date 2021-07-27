import React from 'react';
import MovieCard from '../components/MovieCard';
import movieListStyles from '../styles/MovieList.module.css';

const MovieList = ({ movies }) => {
	return (
		<div className={movieListStyles.scrollWrapper}>
			{movies.map((m) => <MovieCard title={m.Title} img={m.Poster} year={m.Year} id={m.imdbID} key={m.imdbID} />)}
		</div>
	);
};

export default MovieList;
