import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbMovieCardStyles from '../styles/DBMovieCard.module.css';

const DBMovieCard = ({ img, id, title }) => {
	return (
		<Link href="/movie/[id]" as={`/movie/${id}`}>
			<div className={dbMovieCardStyles.movieCard}>
				{img == 'N/A' ? (
					<Image
						className={dbMovieCardStyles.cardImage}
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
						alt={title}
						height={215}
						width={135}
					/>
				) : (
					<Image className={dbMovieCardStyles.cardImage} src={img} alt={title} height={215} width={145} />
				)}
			</div>
		</Link>
	);
};

export default DBMovieCard;
