import Link from 'next/link';
import dbMovieCardStyles from '../styles/DBMovieCard.module.css';

const DBMovieCard = ({ img, id }) => {
	return (
		<Link href="/movie/[id]" as={`/movie/${id}`}>
			<div className={dbMovieCardStyles.movieCard}>
				{img == 'N/A' ? (
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
						alt="Movie Poster"
						loading="lazy"
					/>
				) : (
					<img src={img} alt="Movie Poster" loading="lazy" />
				)}
			</div>
		</Link>
	);
};

export default DBMovieCard;
