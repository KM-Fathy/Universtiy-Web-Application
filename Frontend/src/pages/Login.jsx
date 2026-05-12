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
        try {
            // Get the response so we can read the role
            const response = await api.post('/auth/login', credentials);
            
            localStorage.setItem('isAuthenticated', 'true');
            // SAVE THE ROLE HERE:
            localStorage.setItem('userRole', response.data.role); 
            
            navigate('/');
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials. Please try again.");
        }
    };
    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error-text">{error}</p>}
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                
                <button type="submit" className="btn">Login</button>
                <p style={{marginTop: '15px', textAlign: 'center'}}>
                    No account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;