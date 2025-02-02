// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // All credentials
    const credentials = {
        admin: {
            email: "admin@slate.com",
            password: "SlateAdmin@2025",
            role: "admin"
        },
        school: {
            email: "school@slate.com",
            password: "SlateSchool@2025",
            role: "school"
        },
        student: {
            email: "student@slate.com",
            password: "Student@2025",
            role: "student",
            id: 1001,
            name: "Akarsh Gupta",
            grade: "10th",
            achievements: 15,
            subjects: [
                { name: "Mathematics", marks: 85 },
                { name: "Science", marks: 90 },
                { name: "History", marks: 78 },
                { name: "English", marks: 80 },
                { name: "Social Science", marks: 82 },
                { name: "Economics", marks: 68 },
                { name: "Civics", marks: 75 },
                { name: "Moral Ed.", marks: 73 },
                { name: "Geography", marks: 88 }
            ]
        },
        parent: {
            email: "parent@slate.com",
            password: "Parent@2025",
            role: "parent",
            id: 2001,
            name: "Niraj Sen Gupta",
            children: [
                {
                    id: 1001,
                    name: "Akarsh Gupta",
                    grade: "10th",
                    achievements: 15,
                    subjects: [
                        { name: "Mathematics", marks: 85 },
                        { name: "Science", marks: 90 },
                        { name: "History", marks: 78 }
                    ]
                }
            ]
        }
    };

    const validateCredentials = (email, password) => {
        const cleanEmail = email.trim().toLowerCase();

        for (const key in credentials) {
            if (
                cleanEmail === credentials[key].email.toLowerCase() &&
                password === credentials[key].password
            ) {
                return key;
            }
        }
        return null;
    };

    const login = (email, password) => {
        const role = validateCredentials(email, password);

        if (role) {
            setUser({
                ...credentials[role],
                email: email.trim().toLowerCase(),
                role: role
            });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};