import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './Components/Hero';
import RoleSelection from './Components/RoleSelection';
import LoginSection from './Components/LoginSection';
import AdminDashboard from './Components/AdminDashboard';
import SchoolDashboard from './Components/SchoolDashboard';
import StudentDashboard from './Components/StudentDashboard';
import './App.css';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/school-dashboard" element={<SchoolDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/login/:role" element={<LoginSection />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;