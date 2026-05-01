import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
    const [formData, setFormData] = useState({
        userName: '', email: '', firstName: '', lastName: '', phoneNumber: '', password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login'); // Send to login upon success
        } catch (err) {
            setError("Registration failed. Please check your details.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error-text">{error}</p>}
                
                <div className="form-group"><label>Username</label><input type="text" name="userName" onChange={handleChange} required /></div>
                <div className="form-group"><label>Email</label><input type="email" name="email" onChange={handleChange} required /></div>
                <div className="form-group"><label>First Name</label><input type="text" name="firstName" onChange={handleChange} required /></div>
                <div className="form-group"><label>Last Name</label><input type="text" name="lastName" onChange={handleChange} required /></div>
                <div className="form-group"><label>Phone Number</label><input type="text" name="phoneNumber" onChange={handleChange} required /></div>
                <div className="form-group"><label>Password</label><input type="password" name="password" onChange={handleChange} required /></div>
                
                <button type="submit" className="btn">Register</button>
                <p style={{marginTop: '15px', textAlign: 'center'}}><Link to="/login">Back to Login</Link></p>
            </form>
        </div>
    );
}

export default Register;