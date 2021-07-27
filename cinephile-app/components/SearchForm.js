import React from 'react';
import searchFormStyles from '../styles/SearchForm.module.css';

const SearchForm = ({ value, setSearchValue }) => {
	return (
		<div className={searchFormStyles.form}>
			<input
				className={searchFormStyles.input}
				type="text"
				value={value}
				onChange={(event) => setSearchValue(event.target.value)}
				placeholder="Start typing a movie name..."
			/>
		</div>
	);
};

export default SearchForm;
