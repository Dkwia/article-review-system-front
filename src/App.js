import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReviewerDashboard from './pages/ReviewerDashboard';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/reviewer" element={<ReviewerDashboard />} />
    </Routes>
  );
}

export default App;
