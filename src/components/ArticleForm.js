import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map((tag) => tag.trim());

      const payload = {
        Title: formData.title,
        Content: formData.content,
        Category: formData.category,
        Tags: tagsArray,
      };

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5186/api/articles', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Article submitted successfully!');
    } catch (error) {
      setError('Failed to submit article. Please check your input.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Article for Review</h2>
      <div>
        <label>Article Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
        </select>
      </div>
      <div>
        <label>Article Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Enter tags separated by commas"
          required
        />
      </div>
      <button type="submit">Submit for Review</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ArticleForm;
