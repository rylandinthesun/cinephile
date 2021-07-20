import ReviewCard from '../components/ReviewCard';

import reviewListStyles from '../styles/ReviewList.module.css';

const ReviewList = ({ movies }) => {
	return (
		<div className={reviewListStyles.wrapper}>
			{movies.map((m) => (
				<ReviewCard
					img={m.movie_image}
					id={m.imdb_id}
					key={m.id}
					rating={m.rating}
					review={m.review}
					title={m.movie_title}
				/>
			))}
		</div>
	);
};

export default ReviewList;
