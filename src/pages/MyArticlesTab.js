import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyArticlesTab = () => {
  const [articles, setArticles] = useState([]);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const token = localStorage.getItem('token');

useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5186/api/articles/my',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const articlesWithStatus = response.data.map((article) => ({
        ...article,
        status: article.status === 'Draft' ? 'Pending' : article.status || 'Pending',
      }));

      // Fetch reviews for articles with "Submitted" status
      const articlesWithReviews = await Promise.all(
        articlesWithStatus.map(async (article) => {
          if (article.status === 'Submitted') {
            try {
              const reviewResponse = await axios.get(
                `http://localhost:5186/api/reviews/${article.id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              console.log(`Fetched reviews for article ${article.id}:`, reviewResponse.data);

              // Ensure reviews is always an array
              const reviews = Array.isArray(reviewResponse.data) ? reviewResponse.data : [reviewResponse.data];
              return { ...article, reviews };
            } catch (error) {
              console.error(`Failed to fetch reviews for article ${article.id}:`, error);
              return { ...article, reviews: [] };
            }
          }
          return article;
        })
      );

      console.log('Articles with reviews:', articlesWithReviews);

      setArticles(articlesWithReviews);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };
  fetchArticles();
}, [token]);

  const toggleExpand = (articleId) => {
    setExpandedArticleId((prevId) => (prevId === articleId ? null : articleId));
  };

  return (
    <div>
      <h3>My Articles</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <button onClick={() => toggleExpand(article.id)}>
              {article.title} -{' '}
              <span style={{ color: getStatusColor(article.status) }}>{article.status}</span>
            </button>

            {expandedArticleId === article.id && (
              <div style={{ marginLeft: '20px' }}>
                <p style={{ color: 'red' }}>{article.category}</p>
                <p>{article.content}</p>

                {article.status === 'Submitted' && (
                  <div>
                    <h4>Reviews:</h4>
                    {article.reviews.length > 0 ? (
                      article.reviews.map((review) => (
                        <div key={review.id} style={{ marginBottom: '10px' }}>
                          <p>
                            <strong>Rating:</strong> {review.rating}
                          </p>
                          <p>
                            <strong>Recommendation:</strong> {review.recommendation}
                          </p>
                          <p>
                            <strong>Technical Merit:</strong> {review.technicalMerit}
                          </p>
                          <p>
                            <strong>Originality:</strong> {review.originality}
                          </p>
                          <p>
                            <strong>Presentation Quality:</strong> {review.presentationQuality}
                          </p>
                          <p>
                            <strong>Comments to Authors:</strong> {review.commentsToAuthors}
                          </p>
                          <p>
                            <strong>Confidential Comments:</strong> {review.confidentialComments}
                          </p>
                          <p>
                            <strong>Status:</strong> {review.status}
                          </p>
                          <p>
                            <strong>Created At:</strong>{' '}
                            {new Date(review.createdAt).toLocaleString()}
                          </p>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'orange';
    case 'Under Review':
      return 'gray';
    case 'Submitted':
      return 'blue';
    case 'Rejected':
      return 'red';
    default:
      return 'gray';
  }
};

export default MyArticlesTab;
