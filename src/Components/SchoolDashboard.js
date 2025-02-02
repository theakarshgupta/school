// src/components/SchoolDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../Components/AuthContext';

// Mock data
const schoolData = {
  id: 1,
  name: 'Slate High School',
  students: [
    { id: 1, name: 'Akarsh Gupta', grade: '10th', achievements: 15 },
    { id: 2, name: 'Prakash Raj', grade: '11th', achievements: 23 },
    { id: 3, name: 'Arjun Malhotra', grade: '9th', achievements: 9 },
    { id: 4, name: 'Aditya Raj', grade: '12th', achievements: 30 },
  ],
};

const SchoolDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState(schoolData.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [achievementsInput, setAchievementsInput] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [gradeInput, setGradeInput] = useState('');


  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setNameInput(student.name);
    setGradeInput(student.grade);
    setAchievementsInput(student.achievements.toString());
    setShowEditModal(true);
  };

  const saveChanges = () => {
    const updatedStudents = students.map(student =>
      student.id === selectedStudent.id
        ? {
          ...student,
          name: nameInput,
          grade: gradeInput,
          achievements: parseInt(achievementsInput) || 0
        }
        : student
    );
    setStudents(updatedStudents);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login/school');
  };

  if (!user) {
    navigate('/login/school');
    return null;
  }

  return (
    <DashboardContainer>
      <Navbar>
        <h2>{schoolData.name} Dashboard</h2>
        <div>
          <button onClick={() => navigate('/school-dashboard')}>Home</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Navbar>

      <SummaryCards>
        <Card>
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </Card>
        <Card>
          <h3>Total Achievements</h3>
          <p>{students.reduce((sum, student) => sum + student.achievements, 0)}</p>
        </Card>
        <Card>
          <h3>Average Achievements</h3>
          <p>{(students.reduce((sum, s) => sum + s.achievements, 0) / students.length).toFixed(1)}</p>
        </Card>
      </SummaryCards>

      <StudentSection>
        <SectionHeader>
          <h3>Student Management</h3>
          <SearchBox placeholder="Search students..." />
        </SectionHeader>

        <StudentTable>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Achievements</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.achievements}</td>
                <td>
                  <ActionButton onClick={() => handleEditStudent(student)}>
                    Edit
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </StudentSection>

      {showEditModal && (
        <ModalOverlay>
          <Modal>
            <h4 style={styles.modal}>Edit Student Details</h4>
            <FormGroup>
              <label style={styles.label}>Student Name</label>
              <Input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label style={styles.label}>Grade</label>
              <Select
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
              >
                <option value="1st">1st Grade</option>
                <option value="2ns">2nd Grade</option>
                <option value="3rd">3rd Grade</option>
                <option value="4th">4th Grade</option>
                <option value="5th">5th Grade</option>
                <option value="6th">6th Grade</option>
                <option value="7th">7th Grade</option>
                <option value="8th">8th Grade</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <label style={styles.label}>Achievements</label>
              <Input
                type="number"
                value={achievementsInput}
                onChange={(e) => setAchievementsInput(e.target.value)}
                min="0"
              />
            </FormGroup>
            <ButtonGroup>
              <SecondaryButton onClick={() => setShowEditModal(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={saveChanges}>
                Save Changes
              </PrimaryButton>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

// Styled components
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
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
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:first-child {
      background-color: #e2e8f0;
      color: #1e293b;
      border: 1px solid #cbd5e1;
    }

    &:last-child {
      background-color: #3b82f6;
      color: white;
      border: none;
    }
  }
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

const StudentSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchBox = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  width: 250px;
`;

const StudentTable = styled.table`
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

const ActionButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 350px;  // Slightly narrower
  max-width: 90vw;
  h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #1a365d;
  }
`;

const Input = styled.input`
  width: calc(100% - 1.5rem);
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const PrimaryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Select = styled.select`
  width: calc(100% - 1.5rem);
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  background-color: white;
  height: 35px;
`;

// Add this styled component near your other styled components
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const styles = {
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.85rem',
    color: '#4a5568'
  }
};
export default SchoolDashboard;