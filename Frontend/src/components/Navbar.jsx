import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    // Read the role from localStorage
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '15px 30px', backgroundColor: '#1f2028', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>University Portal</h2>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, alignItems: 'center' }}>
                <li><Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link></li>
                <li><Link to="/students" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Students</Link></li>
                <li><Link to="/courses" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Courses</Link></li>
                <li><Link to="/departments" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Departments</Link></li>
                
                {/* ONLY SHOW THIS LINK IF THE USER IS AN ADMIN */}
                {userRole === 'Admin' && (
                    <li><Link to="/profiles" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Profiles</Link></li>
                )}
                
                <li>
                    <button 
                        onClick={handleLogout} 
                        style={{ background: 'none', border: 'none', color: '#d93025', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginLeft: '10px' }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;