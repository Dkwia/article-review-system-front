import React from 'react';

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 100)}...</p>
              <p>Category: {article.category}</p>
              <p>Tags: {article.tags.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticleList;
