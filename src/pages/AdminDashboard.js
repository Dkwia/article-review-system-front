import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'users') {
          const response = await axios.get('http://localhost:5186/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(response.data);
        } else if (activeTab === 'articles') {
          const response = await axios.get('http://localhost:5186/api/admin/articles', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setArticles(response.data);
        } else if (activeTab === 'reviews') {
          const response = await axios.get('http://localhost:5186/api/admin/reviews/completed', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReviews(response.data);
        }
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch data.');
        console.error(error);
      }
    };
    fetchData();
  }, [activeTab, token]);

  const handleDeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5186/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Remove the deleted user from the state
    setUsers(users.filter((user) => user.id !== userId));
    alert(response.data.message || 'User deleted successfully.');
  } catch (error) {
    setError(error.response?.data?.error || 'Failed to delete user.');
    console.error(error);
  }
};

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5186/api/admin/users/${userId}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user.id === userId ? { ...user, isBlocked: true } : user)));
      alert('User blocked successfully.');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to block user.');
      console.error(error);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`http://localhost:5186/api/admin/article/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(articles.filter((article) => article.id !== articleId));
      alert('Article deleted successfully.');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete article.');
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5186/api/admin/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert('Review deleted successfully.');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete review.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('articles')}>Articles</button>
        <button onClick={() => setActiveTab('reviews')}>Reviews</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {activeTab === 'users' && (
        <div>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.email} - {user.role}
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'articles' && (
        <div>
          <h3>Articles</h3>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                {article.title} - {article.category}
                <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                Article ID: {review.articleId}, Rating: {review.rating}
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
