import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole'); 

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2>University Portal</h2>
            
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                
                {userRole === 'Admin' && (
                    <>
                        <Link to="/students">Students</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/departments">Departments</Link>
                        <Link to="/profiles">Profiles</Link>
                    </>
                )}

                <button 
                    onClick={handleLogout} 
                    className="btn btn-danger" 
                    style={{ padding: '6px 14px', fontSize: '13px', marginLeft: '12px' }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;