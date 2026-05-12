import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
    const [formData, setFormData] = useState({ 
        userName: '', 
        email: '', 
        firstName: '', 
        lastName: '', 
        phoneNumber: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.[0]?.description || "Registration failed. Please check credentials.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box" style={{ maxWidth: '480px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', color: 'var(--primary)' }}>Join the Portal</h2>
                    <p style={{ fontSize: '14px' }}>Create your student account to get started</p>
                </div>
                
                {error && <div className="error-text" style={{ marginBottom: '20px', color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {/* Fixed Grid for First and Last Name */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '20px', 
                        marginBottom: '0px' 
                    }}>
                        <div className="input-group">
                            <label style={{ marginTop: '0' }}>First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                onChange={handleChange} 
                                required 
                                placeholder="First Name" 
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ marginTop: '0' }}>Last Name</label>
                            <input 
                                type="text" 
                                name="lastName" 
                                onChange={handleChange} 
                                required 
                                placeholder="Last Name" 
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="userName" 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your username" 
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleChange} 
                            required 
                            placeholder="name@university.com" 
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your phone number" 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your password" 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                    >
                        Complete Registration
                    </button>
                    
                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;