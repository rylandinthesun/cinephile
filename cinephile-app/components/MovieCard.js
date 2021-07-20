import Link from 'next/link';
import movieCardStyles from '../styles/MovieCard.module.css';

const MovieCard = ({ title, img, year, id }) => {
	return (
		<Link href="/movie/[id]" as={`/movie/${id}`}>
			<div className={movieCardStyles.movieCard}>
				{img == 'N/A' ? (
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
						alt="Movie Poster"
						loading="lazy"
					/>
				) : (
					<img src={img} alt="Movie Poster" loading="lazy" />
				)}

				<div className={movieCardStyles.title}>
					{title.length > 16 ? (
						<div className={movieCardStyles.name}>{title.slice(0, 16)}...</div>
					) : (
						<div className={movieCardStyles.name}>{title}</div>
					)}

					<div className={movieCardStyles.year}>{year}</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;