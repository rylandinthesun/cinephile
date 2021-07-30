import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import movieCardStyles from '../styles/MovieCard.module.css';

const MovieCard = ({ title, img, year, id }) => {
	return (
		<Link href="/movie/[id]" as={`/movie/${id}`}>
			<div className={movieCardStyles.movieCard}>
				{img == 'N/A' ? (
					<Image
						className={movieCardStyles.cardImage}
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
						alt={title}
						height={250}
						width={165}
						layout="fixed"
					/>
				) : (
					<Image
						className={movieCardStyles.cardImage}
						src={img}
						alt={title}
						height={250}
						width={165}
						layout="fixed"
					/>
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
