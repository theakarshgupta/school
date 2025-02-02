import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const LoginSection = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (login(email, password)) {
            // this determines the role based on the mail
            const role = email.trim().toLowerCase() === "admin@slate.com" ? "admin" :
                email.trim().toLowerCase() === "school@slate.com" ? "school" :
                    "student";

            navigate(`/${role}-dashboard`);
        } else {
            setError('Invalid credentials. Please Try Again');
        }
    };

    const handleGoBack = () => {
        navigate('/role-selection');
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <button
                    style={styles.backButton}
                    onClick={handleGoBack}
                >
                    ← Back
                </button>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            style={styles.input}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.loginButton}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        padding: '2rem'
    },
    loginBox: {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        color: '#1a365d',
        marginBottom: '2rem',
        fontSize: '1.5rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.9rem',
        color: '#4a5568',
        marginBottom: '0.25rem'
    },
    input: {
        padding: '0.8rem',
        borderRadius: '5px',
        border: '1px solid #cbd5e0',
        fontSize: '1rem',
        width: '100%',
        boxSizing: 'border-box'
    },
    loginButton: {
        backgroundColor: '#4299e1',
        color: 'white',
        padding: '1rem',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '100%',
        '&:hover': {
            backgroundColor: '#3182ce'
        }
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
    error: {
        color: '#e53e3e',
        fontSize: '0.9rem',
        marginBottom: '1rem',
        whiteSpace: 'pre-line'
    }
};

export default LoginSection;