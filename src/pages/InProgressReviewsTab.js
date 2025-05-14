import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InProgressReviewsTab = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: null,
    recommendation: '',
    technicalMerit: '',
    originality: '',
    presentationQuality: '',
    commentsToAuthors: '',
    confidentialComments: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInProgressArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5186/api/reviewrequests/inprogress', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        setError('Failed to fetch in-progress articles.');
        console.error(error);
      }
    };
    fetchInProgressArticles();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedArticleId) {
        throw new Error("No article selected.");
      }

      const response = await axios.post(
        'http://localhost:5186/api/reviews',
        {
          articleId: selectedArticleId,
          ...reviewData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Review created successfully!');
      window.location.reload(); 
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create review.');
      console.error(error);
    }
  };

  const handleUpdate = async (reviewId) => {
    try {
      const response = await axios.put(
        `http://localhost:5186/api/reviews/${reviewId}`,
        {
          articleId: selectedArticleId,
          ...reviewData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Review updated successfully!');
      window.location.reload(); 
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update review.');
      console.error(error);
    }
  };

  const handleDownload = async (articleId) => {
    try {
      const response = await axios.get(
        `http://localhost:5186/api/articles/${articleId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // Important for downloading files
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `article-${articleId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to download article.');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>In Progress Reviews</h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <h4>{request.title}</h4>
              <p>Category: {request.category}</p>
              <button onClick={() => setSelectedArticleId(request.id)}>Select Article</button>
              <button onClick={() => handleDownload(request.id)}>Download PDF</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No in-progress articles for review.</p>
      )}

      {selectedArticleId && (
        <form onSubmit={handleSubmit}>
          <h3>Create/Update Review for Selected Article</h3>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={reviewData.rating || ''}
              onChange={handleInputChange}
              min="1"
              max="5"
            />
          </label>
          <br />
          <label>
            Recommendation:
            <select name="recommendation" value={reviewData.recommendation} onChange={handleInputChange}>
              <option value="">--Select--</option>
              <option value="Accept">Accept</option>
              <option value="AcceptWithMinorRevisions">Accept With Minor Revisions</option>
              <option value="AcceptWithMajorRevisions">Accept With Major Revisions</option>
              <option value="Reject">Reject</option>
            </select>
          </label>
          <br />
          <label>
            Technical Merit:
            <textarea name="technicalMerit" value={reviewData.technicalMerit} onChange={handleInputChange}></textarea>
          </label>
          <br />
          <label>
            Originality:
            <textarea name="originality" value={reviewData.originality} onChange={handleInputChange}></textarea>
          </label>
          <br />
          <label>
            Presentation Quality:
            <textarea name="presentationQuality" value={reviewData.presentationQuality} onChange={handleInputChange}></textarea>
          </label>
          <br />
          <label>
            Comments to Authors:
            <textarea name="commentsToAuthors" value={reviewData.commentsToAuthors} onChange={handleInputChange}></textarea>
          </label>
          <br />
          <label>
            Confidential Comments:
            <textarea name="confidentialComments" value={reviewData.confidentialComments} onChange={handleInputChange}></textarea>
          </label>
          <br />
          <button type="submit">Save Review</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InProgressReviewsTab;
