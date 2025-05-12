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
        setArticles(response.data);
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
              {article.title}
            </button>

            {expandedArticleId === article.id && (
              <div style={{ marginLeft: '20px' }}>
                <p style={{ color: 'red' }}>{article.category}</p>
                <p>{article.content}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyArticlesTab;
