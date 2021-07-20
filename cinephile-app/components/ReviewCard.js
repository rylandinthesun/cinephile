import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import reviewCardStyles from '../styles/ReviewCard.module.css';

const ReviewCard = ({ img, id, title, rating, review }) => {
	const stars = Array(rating).fill(0);

	return (
		<Link href="/review/[id]" as={`/review/${id}`}>
			<div className={reviewCardStyles.movieCard}>
				<div className={reviewCardStyles.imgTitle}>
					{img == 'N/A' ? (
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
							alt="Movie Poster"
							loading="lazy"
						/>
					) : (
						<img src={img} alt="Movie Poster" loading="lazy" />
					)}
					<div>
						{title.length > 14 ? <h3>{title.slice(0, 14)}...</h3> : <h3>{title}</h3>}

						{review.length > 80 ? <p>"{review.slice(0, 80)}..."</p> : <p>"{review}"</p>}
					</div>
				</div>
				<div className={reviewCardStyles.rating}>
					{stars.map((i) => {
						return (
							<div>
								<FaStar />
							</div>
						);
					})}
				</div>
			</div>
		</Link>
	);
};

export default ReviewCard;
