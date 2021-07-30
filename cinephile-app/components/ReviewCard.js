import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { v4 as uuid } from 'uuid';
import reviewCardStyles from '../styles/ReviewCard.module.css';

const ReviewCard = ({ img, id, title, rating }) => {
	const stars = Array(rating).fill(0);

	return (
		<Link href="/review/[id]" as={`/review/${id}`}>
			<div className={reviewCardStyles.movieCard}>
				<div className={reviewCardStyles.imgTitle}>
					<div>
						{img == 'N/A' ? (
							<Image
								className={reviewCardStyles.cardImage}
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
								alt={title}
								height={96}
								width={64}
								layout="fixed"
							/>
						) : (
							<Image
								className={reviewCardStyles.cardImage}
								src={img}
								alt={title}
								height={96}
								width={64}
								layout="fixed"
							/>
						)}
					</div>
				</div>
				<div className={reviewCardStyles.clickTo} data-testid={rating}>
					<div className={reviewCardStyles.rating}>
						{stars.map((i) => {
							return (
								<div key={uuid()}>
									<FaStar />
								</div>
							);
						})}
					</div>
					<div className={reviewCardStyles.review}>
						Review<IoIosArrowForward />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ReviewCard;
