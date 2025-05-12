import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCompletedReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5186/api/reviews/completed', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        setError('Failed to fetch completed reviews.');
        console.error(error);
      }
    };
    fetchCompletedReviews();
  }, [token]);

  return (
    <div>
      <h3>Completed Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.articleTitle}</h4>
              <p>Author: {review.authorName}</p>
              <p>Rating: {review.rating ?? 'N/A'}</p>
              <p>Recommendation: {review.recommendation}</p>
              <p>Created At: {new Date(review.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed reviews available.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CompletedReviewsTab;
