import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewerProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5186/api/reviewer/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch reviewer profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div>
      <h3>Reviewer Dashboard</h3>
      <p>Status: Active Reviewer</p>
      <div>
        <h4>Personal Information</h4>
        <div>
          <label>Full Name:</label>
          <input value={profile?.fullName} readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input value={profile?.email} readOnly />
        </div>
        <div>
          <label>Institution:</label>
          <input value={profile?.institution} readOnly />
        </div>
        <div>
          <label>Field of Expertise:</label>
          <input value={profile?.fieldOfExpertise} readOnly />
        </div>
      </div>
      <div>
        <h4>Review Statistics</h4>
        <div>
          <p>Total Reviews: {profile?.totalReviews}</p>
          <p>In Progress: {profile?.inProgressReviews}</p>
          <p>Completed: {profile?.completedReviews}</p>
        </div>
      </div>
      <div>
        <h4>Review Preferences</h4>
        <div>
          <label>
            <input
              type="checkbox"
              checked={profile?.availableForReviews}
              disabled
            />{' '}
            Available for new reviews
          </label>
        </div>
        <div>
          <label>Maximum concurrent reviews:</label>
          <input
            type="number"
            value={profile?.maxConcurrentReviews}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewerProfileTab;
