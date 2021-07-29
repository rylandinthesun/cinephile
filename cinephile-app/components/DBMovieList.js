import React from 'react';
import DBMovieCard from '../components/DBMovieCard';
import { v4 as uuid } from 'uuid';
import dbMovieListStyles from '../styles/DBMovieList.module.css';

const DBMovieList = ({ movies }) => {
	return (
		<div className={dbMovieListStyles.scrollWrapper}>
			{movies.map((m) => <DBMovieCard img={m.movie_image} title={m.movie_title} id={m.imdb_id} key={uuid()} />)}
		</div>
	);
};

export default DBMovieList;
