import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from '../components/ReviewList';

const ReviewerPage = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5186/api/reviews/completed',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [token]);

  return (
    <div>
      <h2>Reviewer Dashboard</h2>
      <h3>Completed Reviews</h3>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewerPage;
