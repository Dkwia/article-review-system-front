import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthorPage from './AuthorPage';
import ReviewerPage from './ReviewerPage';
import AdminPage from './AdminPage';
import NotFound from './NotFound';

const Dashboard = () => {
  const role = localStorage.getItem('role'); 

  console.log('Current Role:', role); 

  return (
    <div>
      <h2>Dashboard</h2>
      <Routes>
        
        <Route
          path="/"
          element={
            role === 'Author'
              ? <Navigate to="/dashboard/author" />
              : role === 'Reviewer'
              ? <Navigate to="/dashboard/reviewer" />
              : role === 'Admin'
              ? <Navigate to="/dashboard/admin" />
              : <NotFound message={`Role not found. Current Role: ${role}`} />
          }
        />

        <Route path="author" element={<AuthorPage />} />
        <Route path="reviewer" element={<ReviewerPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
