import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5186/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load profile. Please try again.');
      }
    };
    fetchProfile();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label>Full Name:</label>
        <input value={`${profile.firstName} ${profile.lastName}`} readOnly />
      </div>
      <div>
        <label>Email:</label>
        <input value={profile.email} readOnly />
      </div>
      <div>
        <label>Specialization:</label>
        <input value={profile.specialization} readOnly />
      </div>
      <div>
        <label>Bio:</label>
        <textarea value={profile.bio} readOnly></textarea>
      </div>
      <div>
        <label>Location:</label>
        <input value={profile.location} readOnly />
      </div>
      <div>
        <label>Institution:</label>
        <input value={profile.institution} readOnly />
      </div>
      <div>
        <label>Social Links:</label>
        <input value={profile.socialLinks} readOnly />
      </div>
    </div>
  );
};

export default Profile;
