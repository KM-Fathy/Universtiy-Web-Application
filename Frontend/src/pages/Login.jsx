import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
    const [credentials, setCredentials] = useState({ email: '', phoneNumber: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', response.data.role); 
            navigate('/');
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '28px' }}>Welcome Back</h2>
                
                {error && (
                    <div style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid var(--danger)', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={handleChange} required placeholder="student@university.edu" />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="text" name="phoneNumber" onChange={handleChange} required placeholder="Enter your phone number" />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange} required placeholder="Enter your password" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
                        Sign In
                    </button>
                    
                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;