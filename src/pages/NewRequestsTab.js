import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPendingArticles = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5186/api/reviewrequests/pending-articles',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        setError('Failed to fetch pending articles.');
        console.error(error);
      }
    };
    fetchPendingArticles();
  }, [token]);

  const handleAction = async (articleId, action) => {
  try {
    const endpoint = action === 'accept'
      ? `http://localhost:5186/api/reviewrequests/${articleId}/accept`
      : `http://localhost:5186/api/reviewrequests/${articleId}/decline`;

    const response = await axios.put(endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(response.data.message || `Article ${action}ed successfully.`);
    window.location.reload(); // Refresh the page after updating status
  } catch (error) {
    setError(error.response?.data?.error || 'Failed to update article.');
    console.error(error);
  }
};

  return (
    <div>
      <h3>New Review Requests</h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <h4>{request.title}</h4>
              <p>Category: {request.category}</p>
              <p>Status: {request.status}</p>
              <button onClick={() => handleAction(request.id, 'accept')}>Accept</button>
              <button onClick={() => handleAction(request.id, 'decline')}>Decline</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending articles for review.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NewRequestsTab;
