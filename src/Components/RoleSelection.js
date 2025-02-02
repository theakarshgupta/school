import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/'); //Fot homepage
    };

    const roles = [
        { id: 1, name: 'Admin', icon: '💼' },
        { id: 2, name: 'School', icon: '🏫' },
        { id: 3, name: 'Student', icon: '🎒' },
        { id: 4, name: 'Parent', icon: '👪' }
    ];

    return (
        <div style={styles.container}>
            <button
                style={styles.backButton}
                onClick={handleGoBack}
            >
                ← Back to Home
            </button>
            <h2 style={styles.title}>Select Your Role</h2>
            <div style={styles.rolesContainer}>
                {roles.map((role) => (
                    <div
                        key={role.id}
                        style={styles.roleCard}
                        onClick={() => navigate(`/login/${role.name.toLowerCase()}`)}
                    >
                        <span style={styles.icon}>{role.icon}</span>
                        <h3>{role.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '4rem 2rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f4f8'
    },
    title: {
        fontSize: '2rem',
        color: '#1a365d',
        marginBottom: '3rem'
    },
    rolesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
    },
    roleCard: {
        width: '200px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        textAlign: 'center',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    },
    icon: {
        fontSize: '2.5rem',
        display: 'block',
        marginBottom: '1rem'
    },
    backButton: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#e2e8f0',
        color: '#4a5568',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#cbd5e0'
        }
    },
};

export default RoleSelection;