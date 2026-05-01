import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '', major: '', departmentId: '' });
    const [isEditing, setIsEditing] = useState(false);
    
    // Check the role of the logged-in user
    const userRole = localStorage.getItem('userRole');

    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            setStudents(response.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name: formData.name, major: formData.major, departmentId: parseInt(formData.departmentId) };
        try {
            if (isEditing) {
                await api.put(`/students/${formData.id}`, payload);
            } else {
                await api.post('/students', payload);
            }
            setFormData({ id: null, name: '', major: '', departmentId: '' });
            setIsEditing(false);
            fetchStudents();
        } catch (err) {
            alert("Failed to save student. Make sure you are logged in as Admin!");
        }
    };

    const handleEdit = (student) => {
        setFormData({ id: student.id, name: student.name, major: student.major || '', departmentId: student.departmentId || '' });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try { await api.delete(`/students/${id}`); fetchStudents(); } 
            catch (err) { console.error(err); }
        }
    };

    const handleAddCourse = async (studentId) => {
        const courseId = window.prompt("Enter the Course ID you want to register this student in:");
        if (courseId) {
            try { await api.post(`/students/${studentId}/courses/${courseId}`); alert("Course added!"); fetchStudents(); } 
            catch (err) { alert("Failed to add course."); }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ display: 'flex', gap: '40px' }}>
                
                {/* ONLY SHOW FORM IF ADMIN */}
                {userRole === 'Admin' && (
                    <div style={{ flex: '1' }}>
                        <h2>{isEditing ? "Edit Student" : "Add New Student"}</h2>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group"><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
                            <div className="form-group"><label>Major</label><input type="text" name="major" value={formData.major} onChange={handleChange} required /></div>
                            <div className="form-group"><label>Department ID</label><input type="number" name="departmentId" value={formData.departmentId} onChange={handleChange} required /></div>
                            <button type="submit" className="btn">{isEditing ? "Update Student" : "Create Student"}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '', major: '', departmentId: '' }); }} style={{marginTop: '10px', background: 'gray', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Cancel Edit</button>}
                        </form>
                    </div>
                )}

                <div style={{ flex: userRole === 'Admin' ? '2' : '1' }}>
                    <h2>Student List</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'var(--code-bg)' }}>
                        <thead>
                            <tr style={{ background: 'var(--accent)', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Name</th>
                                <th style={{ padding: '12px' }}>Department</th>
                                <th style={{ padding: '12px' }}>Courses</th>
                                {/* ONLY SHOW ACTIONS HEADER IF ADMIN */}
                                {userRole === 'Admin' && <th style={{ padding: '12px' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}>{s.id}</td>
                                    <td style={{ padding: '12px' }}>{s.name}</td>
                                    <td style={{ padding: '12px' }}>{s.departmentName}</td>
                                    <td style={{ padding: '12px' }}>{s.courseTitles && s.courseTitles.length > 0 ? s.courseTitles.join(', ') : 'None'}</td>
                                    
                                    {/* ONLY SHOW BUTTONS IF ADMIN */}
                                    {userRole === 'Admin' && (
                                        <td style={{ padding: '12px' }}>
                                            <button onClick={() => handleAddCourse(s.id)} style={{ marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'green', fontWeight: 'bold' }}>+ Course</button>
                                            <button onClick={() => handleEdit(s)} style={{ marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold' }}>Edit</button>
                                            <button onClick={() => handleDelete(s.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#d93025', fontWeight: 'bold' }}>Delete</button>
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