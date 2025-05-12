import React, { useState } from 'react';
import axios from 'axios';

const SubmitArticleTab = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert the tags string into an array
      const tagsArray = formData.tags.split(',').map((tag) => tag.trim());

      // Prepare the payload
      const payload = {
        Title: formData.title,
        Content: formData.content,
        Category: formData.category,
        Tags: tagsArray,
      };

      // Send the POST request
      await axios.post('http://localhost:5186/api/articles', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Article submitted successfully!');
      window.location.reload(); // Refresh the page after submission
    } catch (error) {
      setError('Failed to submit article. Please check your input.');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Submit Article for Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter article title"
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
          <label>Content:</label>
          <textarea
            name="content"
            placeholder="Write your article content here..."
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
            placeholder="Enter tags separated by commas"
            value={formData.tags}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit for Review</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SubmitArticleTab;
