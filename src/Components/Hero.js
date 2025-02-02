// HeroSection.js
import React from 'react';
import { FaBookOpen, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div style={styles.heroContainer}>
            <div style={styles.heroContent}>
                <h1 style={styles.title}>Welcome to SmartSchool Manager</h1>
                <p style={styles.subtitle}>Streamline Your School Administration with Digital Excellence</p>

                <div style={styles.featuresContainer}>
                    <div style={styles.featureCard}>
                        <FaBookOpen style={styles.icon} />
                        <h3>Student Management</h3>
                        <p>Efficiently manage student records and progress</p>
                    </div>

                    <div style={styles.featureCard}>
                        <FaChalkboardTeacher style={styles.icon} />
                        <h3>Staff Management</h3>
                        <p>Organize faculty information and schedules</p>
                    </div>

                    <div style={styles.featureCard}>
                        <FaUsers style={styles.icon} />
                        <h3>Parent Portal</h3>
                        <p>Connect parents with student activities</p>
                    </div>
                </div>

                <button
                    style={styles.ctaButton}
                    onClick={() => navigate('/role-selection')}
                >
                    Get Started Now
                </button>
            </div>
        </div>
    );
};

const styles = {
    heroContainer: {
        backgroundColor: '#f0f4f8',
        padding: '4rem 2rem',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroContent: {
        maxWidth: '1200px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5rem',
        color: '#1a365d',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '3rem',
    },
    featuresContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem',
        marginBottom: '3rem',
    },
    featureCard: {
        flex: '1',
        minWidth: '250px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    icon: {
        fontSize: '2.5rem',
        color: '#4299e1',
        marginBottom: '1rem',
    },
    ctaButton: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        backgroundColor: '#4299e1',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default HeroSection;