import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function Dashboard() {
    const userRole = localStorage.getItem('userRole') || 'Student';
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(''); // NEW: Error state
    
    // For Admins
    const [stats, setStats] = useState({ students: 0, courses: 0, departments: 0 });
    
    // For Students
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        if (userRole === 'Admin') {
            // Fetch Admin Statistics
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
                    console.error(err); 
                    setError("Failed to load dashboard statistics.");
                    setIsLoading(false); 
                }
            };
            fetchStats();
        } else {
            // Fetch the Specific Student's Data and Classmates
            const fetchMyProfile = async () => {
                try {
                    const response = await api.get('/students/me');
                    setMyProfile(response.data);
                    setIsLoading(false);
                } catch (err) { 
                    console.error("Failed to fetch profile", err);
                    // NEW: Provide a visible error if the backend rejects the request
                    setError("Could not load your profile. The backend rejected the request.");
                    setIsLoading(false); 
                }
            };
            fetchMyProfile();
        }
    }, [userRole]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '10px' }}>Welcome, {myProfile ? myProfile.name : userRole}!</h1>

                {isLoading ? (
                    <p>Loading your portal...</p>
                ) : error ? (
                    // NEW: Display the error message cleanly
                    <p style={{ color: '#d93025', fontWeight: 'bold', fontSize: '18px' }}>{error}</p>
                ) : userRole === 'Admin' ? (
                    
                    /* ========================================= */
                    /* ADMIN VIEW                                */
                    /* ========================================= */
                    <>
                        <p style={{ color: 'var(--text)', marginBottom: '40px' }}>Here is an overview of the University Portal data.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            <Link to="/students" style={{ textDecoration: 'none' }}>
                                <div style={cardStyle}><h2>{stats.students}</h2><p>Total Students</p></div>
                            </Link>
                            <Link to="/courses" style={{ textDecoration: 'none' }}>
                                <div style={cardStyle}><h2>{stats.courses}</h2><p>Active Courses</p></div>
                            </Link>
                            <Link to="/departments" style={{ textDecoration: 'none' }}>
                                <div style={cardStyle}><h2>{stats.departments}</h2><p>Departments</p></div>
                            </Link>
                        </div>
                    </>

                ) : (

                    /* ========================================= */
                    /* STUDENT VIEW                              */
                    /* ========================================= */
                    myProfile && (
                        <div>
                            <div style={{ padding: '20px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--accent)', borderRadius: '8px', marginBottom: '30px' }}>
                                <h2 style={{ margin: '0 0 10px 0' }}>My Department</h2>
                                <h3 style={{ margin: 0, color: 'var(--accent)' }}>{myProfile.department}</h3>
                            </div>

                            <h2>My Registered Courses</h2>
                            {myProfile.courses.length === 0 ? (
                                <p>You have not been assigned to any courses yet.</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                    {myProfile.courses.map((course, index) => (
                                        <div key={index} style={{ padding: '20px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                                            <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-h)' }}>{course.title} ({course.credits} Credits)</h3>
                                            
                                            <h4 style={{ marginTop: '15px', color: 'var(--text)', fontSize: '14px' }}>Classmates:</h4>
                                            {course.classmates.length > 0 ? (
                                                <ul style={{ paddingLeft: '20px', color: '#9ca3af' }}>
                                                    {course.classmates.map((name, i) => <li key={i}>{name}</li>)}
                                                </ul>
                                            ) : (
                                                <p style={{ color: '#9ca3af', fontSize: '14px' }}>No other students are in this course yet.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

const cardStyle = {
    backgroundColor: 'var(--code-bg)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-h)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s ease, border-color 0.2s ease', cursor: 'pointer'
};

export default Dashboard;