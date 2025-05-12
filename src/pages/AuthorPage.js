import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileTab from './ProfileTab'; // Component for Profile tab
import MyArticlesTab from './MyArticlesTab'; // Component for My Articles tab
import SubmitArticleTab from './SubmitArticleTab'; // Component for Submit Article tab

const AuthorPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Default active tab
  const [profile, setProfile] = useState(null); // Store profile data
  const token = localStorage.getItem('token');

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5186/api/auth/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="container">
      <h2>Author Dashboard</h2>
      <div className="tabs">
        <button
          onClick={() => setActiveTab('profile')}
          className={activeTab === 'profile' ? 'active' : ''}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('my-articles')}
          className={activeTab === 'my-articles' ? 'active' : ''}
        >
          My Articles
        </button>
        <button
          onClick={() => setActiveTab('submit-article')}
          className={activeTab === 'submit-article' ? 'active' : ''}
        >
          Submit Article for Review
        </button>
      </div>

      {/* Render the active tab */}
      {activeTab === 'profile' && <ProfileTab profile={profile} />}
      {activeTab === 'my-articles' && <MyArticlesTab />}
      {activeTab === 'submit-article' && <SubmitArticleTab />}
    </div>
  );
};

export default AuthorPage;
