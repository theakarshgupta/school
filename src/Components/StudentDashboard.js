// src/components/StudentDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../Components/AuthContext';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [studentData, setStudentData] = useState({ ...user });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = () => {
    //Demo purpose
    setEditMode(false);
  };

  const handleDelete = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login/student');
    return null;
  }

  return (
    <DashboardContainer>
      <Navbar>
        <h2>Welcome, {user.name}</h2>
        <div>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </Navbar>

      <ProfileSection>
        {editMode ? (
          <EditForm>
            <FormGroup>
              <label>Name:</label>
              <Input
                value={studentData.name}
                onChange={e => setStudentData({ ...studentData, name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <label>Grade:</label>
              <Select
                value={studentData.grade}
                onChange={e => setStudentData({ ...studentData, grade: e.target.value })}
              >
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </Select>
            </FormGroup>
            <ButtonGroup>
              <SaveButton onClick={handleUpdate}>Save Changes</SaveButton>
              <DeleteButton onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </DeleteButton>
            </ButtonGroup>
          </EditForm>
        ) : (
          <ProfileInfo>
            <InfoItem>
              <Label>Student ID:</Label>
              <Value>{user.id}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Name:</Label>
              <Value>{user.name}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Grade:</Label>
              <Value>{user.grade}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email:</Label>
              <Value>{user.email}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Achievements:</Label>
              <Value>{user.achievements}</Value>
            </InfoItem>
          </ProfileInfo>
        )}
      </ProfileSection>

      <SubjectsSection>
        <h3>Academic Performance</h3>
        <SubjectsGrid>
          {user.subjects.map((subject, index) => (
            <SubjectCard key={index}>
              <SubjectName>{subject.name}</SubjectName>
              <Marks>{subject.marks}%</Marks>
            </SubjectCard>
          ))}
        </SubjectsGrid>
      </SubjectsSection>

      {showDeleteConfirm && (
        <ModalOverlay>
          <Modal>
            <h3>Confirm Account Deletion</h3>
            <p>Are you sure you want to permanently delete your account?</p>
            <ButtonGroup>
              <CancelButton onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </CancelButton>
              <ConfirmDeleteButton onClick={handleDelete}>
                Delete Permanently
              </ConfirmDeleteButton>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

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
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:first-child {
      background-color: #3b82f6;
      color: white;
      border: none;
    }

    &:last-child {
      background-color: #e2e8f0;
      color: #1e293b;
      border: 1px solid #cbd5e1;
    }
  }
`;

const ProfileSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SaveButton = styled.button`
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoItem = styled.div`
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
`;

const Label = styled.span`
  display: block;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.span`
  display: block;
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 500;
`;

const SubjectsSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SubjectCard = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  border-radius: 8px;
  text-align: center;
`;

const SubjectName = styled.h4`
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Marks = styled.div`
  font-size: 1.5rem;
  color: #3b82f6;
  font-weight: bold;
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
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
`;

const CancelButton = styled.button`
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ConfirmDeleteButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
export default StudentDashboard;