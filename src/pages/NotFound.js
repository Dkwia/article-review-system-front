import React from 'react';

const NotFound = ({ message }) => {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
};

export default NotFound;
