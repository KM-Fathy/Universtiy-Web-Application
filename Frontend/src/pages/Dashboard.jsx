import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function Dashboard() {
    // State to hold our counts
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        departments: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    
    // Get the user role to personalize the greeting
    const userRole = localStorage.getItem('userRole') || 'Student';

    useEffect(() => {
        // Fetch all data concurrently to get the totals
        const fetchStats = async () => {
            try {
                const [studentsRes, coursesRes, deptsRes] = await Promise.all([
                    api.get('/students'),
                    api.get('/courses'),
                    api.get('/departments')
                ]);

                setStats({
                    students: studentsRes.data.length,
                    courses: coursesRes.data.length,
                    departments: deptsRes.data.length
                });
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching stats:", err);
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '10px' }}>Welcome, {userRole}!</h1>
                <p style={{ color: 'var(--text)', marginBottom: '40px' }}>
                    Here is an overview of the University Portal data.
                </p>

                {isLoading ? (
                    <p>Loading university statistics...</p>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {/* Student Card */}
                        <Link to="/students" style={{ textDecoration: 'none' }}>
                            <div style={cardStyle}>
                                <h2>{stats.students}</h2>
                                <p>Total Students</p>
                            </div>
                        </Link>

                        {/* Course Card */}
                        <Link to="/courses" style={{ textDecoration: 'none' }}>
                            <div style={cardStyle}>
                                <h2>{stats.courses}</h2>
                                <p>Active Courses</p>
                            </div>
                        </Link>

                        {/* Department Card */}
                        <Link to="/departments" style={{ textDecoration: 'none' }}>
                            <div style={cardStyle}>
                                <h2>{stats.departments}</h2>
                                <p>Departments</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple inline styling for the modern cards
const cardStyle = {
    backgroundColor: 'var(--code-bg)',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    textAlign: 'center',
    color: 'var(--text-h)',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer'
};

export default Dashboard;