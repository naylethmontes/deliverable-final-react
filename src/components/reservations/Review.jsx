import { useState } from 'react';
import ReviewRating from './ReviewRating';
import useApiFetch from '../../hooks/useApiFetch';
import toast from 'react-hot-toast';

const initialState = {
	hotelId: null,
	rating: 0,
	comment: '',
};

function Review({ hotelId, closeModal }) {
	const [_, fetchReview] = useApiFetch();
	const [review, setReview] = useState(initialState);
	const [error, setError] = useState(null);

	const handleSubmit = () => {
		const { comment, rating } = review;
		toast('Your review has been successful⭐');

		if (!comment || rating === 0) {
			setError('Please fill all the fields');
			return;
		}
		fetchReview({
			url: 'reviews',
			method: 'POST',
			body: {
				...review,
				hotelId,
			},
		});
		setReview(initialState);
		closeModal();
	};

	return (
		<div className="w-80">
			<h2 className="text-2xl font-semibold mb-4">Review</h2>

			<div className="mb-4">
				<ReviewRating setReview={setReview} />
			</div>

			<textarea
				className="input-form resize-none h-24 mb-4"
				placeholder="Write your review here.."
				value={review.comment}
				onChange={(e) => setReview({ ...review, comment: e.target.value })}
			></textarea>

			{error && <p className="error-validation mb-4">{error}</p>}

			<button className="btn" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
}

export default Review;
