// src/components/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

// Mock data
const schools = [
  { id: 1, name: 'Dav Public School', students: 450, location: 'Patna, Bihar' },
  { id: 2, name: 'RPS School', students: 320, location: 'Patna, Bihar' },
  { id: 3, name: 'Delhi Public School', students: 280, location: 'Patna, Bihar' },
];

const students = [
  { id: 1, name: 'Akarsh Gupta', school: 'Dav Public School', achievements: 15 },
  { id: 2, name: 'Rishav chandra', school: 'RPS School', achievements: 23 },
  { id: 3, name: 'Megha Kumari', school: 'Delhi Public School', achievements: 9 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login/admin');
  };

  if (!user) {
    navigate('/login/admin');
    return null;
  }

  return (
    <DashboardContainer>
      <Navbar>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </Navbar>

      <SummaryCards>
        <Card>
          <h3>Total Schools</h3>
          <p>{schools.length}</p>
        </Card>
        <Card>
          <h3>Total Students</h3>
          <p>{students.reduce((sum, student) => sum + student.achievements, 0)}</p>
        </Card>
        <Card>
          <h3>Total Achievements</h3>
          <p>{students.reduce((sum, student) => sum + student.achievements, 0)}</p>
        </Card>
      </SummaryCards>

      <SchoolSection>
        <h3>School Overview</h3>
        <SchoolTable>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Location</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {schools.map(school => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.location}</td>
                <td>{school.students}</td>
              </tr>
            ))}
          </tbody>
        </SchoolTable>
      </SchoolSection>

      <AchievementSection>
        <h3>Recent Student Achievements</h3>
        <AchievementList>
          {students.map(student => (
            <AchievementCard key={student.id}>
              <h4>{student.name}</h4>
              <p>School: {student.school}</p>
              <p>Achievements: {student.achievements}</p>
            </AchievementCard>
          ))}
        </AchievementList>
      </AchievementSection>
    </DashboardContainer>
  );
};

// Styled components
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f5f7fa;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    color: #64748b;
    margin-bottom: 1rem;
  }

  p {
    font-size: 2rem;
    color: #1e293b;
    font-weight: bold;
  }
`;

const SchoolSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SchoolTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #f8fafc;
    color: #64748b;
  }
`;

const AchievementSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const AchievementList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const AchievementCard = styled.div`
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;

  h4 {
    margin-bottom: 0.5rem;
    color: #1e293b;
  }

  p {
    color: #64748b;
    margin: 0.25rem 0;
  }
`;

export default AdminDashboard;