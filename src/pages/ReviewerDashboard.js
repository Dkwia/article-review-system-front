import React, { useState } from 'react';
import NewRequestsTab from './NewRequestsTab'; 
import InProgressReviewsTab from './InProgressReviewsTab'; 
import CompletedReviewsTab from './CompletedReviewsTab'; 

const ReviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState('new-requests'); 

  return (
    <div className="container">
      <h2>Reviewer Dashboard</h2>
      <div className="tabs">
        <button
          onClick={() => setActiveTab('new-requests')}
          className={activeTab === 'new-requests' ? 'active' : ''}
        >
          New Requests
        </button>
        <button
          onClick={() => setActiveTab('in-progress')}
          className={activeTab === 'in-progress' ? 'active' : ''}
        >
          In Progress Reviews
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={activeTab === 'completed' ? 'active' : ''}
        >
          Completed Reviews
        </button>
      </div>

      {activeTab === 'new-requests' && <NewRequestsTab />}
      {activeTab === 'in-progress' && <InProgressReviewsTab />}
      {activeTab === 'completed' && <CompletedReviewsTab />}
    </div>
  );
};

export default ReviewerDashboard;
