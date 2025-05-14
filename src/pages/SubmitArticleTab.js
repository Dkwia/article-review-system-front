import React, { useState } from 'react';
import axios from 'axios';

const SubmitArticleTab = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', JSON.stringify(tags));

    try {
      const response = await axios.post(
        'http://localhost:5186/api/articles',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Article created successfully.');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create article.');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Submit New Article</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          Tags (comma-separated):
          <input
            type="text"
            value={tags.join(',')}
            onChange={(e) => setTags(e.target.value.split(','))}
          />
        </label>
        <br />
        <label>
          Upload PDF:
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitArticleTab;
