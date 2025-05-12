import React, { useState } from 'react';
import axios from 'axios';

const ProfileTab = ({ profile }) => {
  const [formData, setFormData] = useState(profile || {});
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        'http://localhost:5186/api/auth/profile',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div>
      <h3>{profile?.firstName} {profile?.lastName}</h3>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
      <p>Specialization: {profile?.specialization}</p>
      <p>Institution: {profile?.institution}</p>
      <p>Bio: {profile?.bio}</p>
      <p>Location: {profile?.location}</p>
      <p>Social Links: {profile?.socialLinks}</p>

      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      {isEditing && (
        <form>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Institution:</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Social Links:</label>
            <input
              type="text"
              name="socialLinks"
              value={formData.socialLinks}
              onChange={handleChange}
              required
            />
          </div>
          <button type="button" onClick={handleSubmit}>Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProfileTab;
