import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>Authors: {review.authors.join(', ')}</p>
          <p>Decision: {review.decision}</p>
          <button onClick={() => alert('View Full Review')}>View Full Review</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
