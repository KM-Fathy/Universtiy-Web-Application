import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function Dashboard() {
    const userRole = localStorage.getItem('userRole') || 'Student';
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [stats, setStats] = useState({ students: 0, courses: 0, departments: 0 });
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        if (userRole === 'Admin') {
            const fetchStats = async () => {
                try {
                    const [studentsRes, coursesRes, deptsRes] = await Promise.all([
                        api.get('/students'), api.get('/courses'), api.get('/departments')
                    ]);
                    setStats({
                        students: studentsRes.data.length,
                        courses: coursesRes.data.length,
                        departments: deptsRes.data.length
                    });
                    setIsLoading(false);
                } catch (err) { 
                    setError("Failed to load dashboard statistics.");
                    setIsLoading(false); 
                }
            };
            fetchStats();
        } else {
            const fetchMyProfile = async () => {
                try {
                    const response = await api.get('/students/me');
                    setMyProfile(response.data);
                    setIsLoading(false);
                } catch (err) { 
                    setError("Could not load your profile. Please contact support.");
                    setIsLoading(false); 
                }
            };
            fetchMyProfile();
        }
    }, [userRole]);

    return (
        <div className="dashboard-wrapper">
            <Navbar />
            <div className="page-container">
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
                        Welcome, <span style={{ color: 'var(--primary)' }}>{myProfile ? myProfile.name : userRole}</span>
                    </h1>
                    <p>University Management System &bull; {new Date().toLocaleDateString()}</p>
                </header>

                {isLoading ? (
                    <div className="loading-state">Initializing your portal...</div>
                ) : error ? (
                    <div className="error-text">{error}</div>
                ) : userRole === 'Admin' ? (
                    <div className="grid-3">
                        <Link to="/students" className="card" style={{ textDecoration: 'none' }}>
                            <span className="badge">DIRECTORY</span>
                            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>{stats.students}</h2>
                            <p>Enrolled Students</p>
                        </Link>
                        <Link to="/courses" className="card" style={{ textDecoration: 'none' }}>
                            <span className="badge">ACADEMIC</span>
                            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>{stats.courses}</h2>
                            <p>Active Courses</p>
                        </Link>
                        <Link to="/departments" className="card" style={{ textDecoration: 'none' }}>
                            <span className="badge">ORGANIZATION</span>
                            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>{stats.departments}</h2>
                            <p>University Departments</p>
                        </Link>
                    </div>
                ) : (
                    myProfile && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                            <aside>
                                <div className="card" style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
                                        {myProfile.name.charAt(0)}
                                    </div>
                                    <h3>{myProfile.name}</h3>
                                    <p style={{ marginTop: '8px' }}>{myProfile.department}</p>
                                    <div className="badge active" style={{ marginTop: '16px' }}>Status: Active</div>
                                </div>
                            </aside>

                            <main>
                                <h2 style={{ marginBottom: '20px' }}>My Academic Schedule</h2>
                                {myProfile.courses.length === 0 ? (
                                    <div className="card" style={{ textAlign: 'center', borderStyle: 'dashed' }}>
                                        <p>No courses assigned yet.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '20px' }}>
                                        {myProfile.courses.map((course, index) => (
                                            <div key={index} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h3 style={{ color: 'var(--primary)' }}>{course.title}</h3>
                                                    <p style={{ fontSize: '13px' }}>Credits: {course.credits}</p>
                                                    <div style={{ marginTop: '12px' }}>
                                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CLASSMATES:</span>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            {course.classmates.map((name, i) => (
                                                                <span key={i} className="badge" style={{ fontSize: '11px' }}>{name}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </main>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Dashboard;