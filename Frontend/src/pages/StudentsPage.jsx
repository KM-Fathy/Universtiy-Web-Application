import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const userRole = localStorage.getItem('userRole');

    const fetchStudents = async () => {
        try { 
            const response = await api.get('/students'); 
            setStudents(response.data); 
        } catch (err) { 
            console.error("Error fetching students:", err); 
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    const handleChangeDepartment = async (student) => {
        const input = window.prompt(`Enter NEW Dept ID for ${student.name}:`);
        if (!input) return;
        try {
            await api.put(`/students/${student.id}`, { name: student.name, departmentId: parseInt(input) });
            fetchStudents();
        } catch (err) { alert("Update failed."); }
    };

    const handleAddCourse = async (id) => {
        const input = window.prompt("Enter Course ID to ADD:");
        if (input) try { await api.post(`/students/${id}/courses/${input}`); fetchStudents(); } catch (err) { alert("Failed to add."); }
    };

    const handleRemoveCourse = async (id) => {
        const input = window.prompt("Enter Course ID to REMOVE:");
        if (input) try { await api.delete(`/students/${id}/courses/${input}`); fetchStudents(); } catch (err) { alert("Failed to remove."); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete account?")) try { await api.delete(`/students/${id}`); fetchStudents(); } catch (err) { alert("Delete failed."); }
    };

    return (
        <div className="directory-wrapper">
            <Navbar />
            <div className="page-container">
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1>Student Directory</h1>
                        <p>Total Registered: {students.length} students</p>
                    </div>
                    {userRole === 'Admin' && <span className="badge active">ADMIN MANAGEMENT MODE</span>}
                </header>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Department</th>
                                <th>Enrollments</th>
                                {userRole === 'Admin' && <th style={{ textAlign: 'right' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td><span className="badge">#{s.id}</span></td>
                                    <td style={{ fontWeight: '600' }}>{s.name}</td>
                                    <td>
                                        <span className={s.departmentName ? "text-main" : "error-text"} style={{ fontSize: '14px', background: 'none', border: 'none', padding: 0 }}>
                                            {s.departmentName || 'PENDING ASSIGNMENT'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            {s.courseTitles?.length > 0 
                                                ? s.courseTitles.map((t, i) => <span key={i} className="badge" style={{ fontSize: '11px' }}>{t}</span>)
                                                : <span style={{ color: 'var(--text-muted)', fontSize: '12px italic' }}>No courses</span>
                                            }
                                        </div>
                                    </td>
                                    {userRole === 'Admin' && (
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleChangeDepartment(s)} className="action-btn">Dept</button>
                                                <button onClick={() => handleAddCourse(s.id)} className="action-btn" style={{ color: 'var(--success)' }}>+ Course</button>
                                                <button onClick={() => handleRemoveCourse(s.id)} className="action-btn" style={{ color: 'var(--warning)' }}>- Course</button>
                                                <button onClick={() => handleDelete(s.id)} className="action-btn" style={{ color: 'var(--danger)' }}>Del</button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentsPage;