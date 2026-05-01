import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ id: null, title: '', credits: '' });
    const [isEditing, setIsEditing] = useState(false);
    const userRole = localStorage.getItem('userRole');

    const fetchCourses = async () => {
        try { const response = await api.get('/courses'); setCourses(response.data); } 
        catch (err) { console.error(err); }
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title: formData.title, credits: parseInt(formData.credits) };
        try {
            if (isEditing) await api.put(`/courses/${formData.id}`, payload);
            else await api.post('/courses', payload);
            setFormData({ id: null, title: '', credits: '' });
            setIsEditing(false);
            fetchCourses();
        } catch (err) { alert("Failed to save course."); }
    };

    const handleEdit = (course) => { setFormData({ id: course.id, title: course.title, credits: course.credits }); setIsEditing(true); };
    const handleDelete = async (id) => { if (window.confirm("Delete course?")) { try { await api.delete(`/courses/${id}`); fetchCourses(); } catch (err) { console.error(err); } } };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ display: 'flex', gap: '40px' }}>
                {userRole === 'Admin' && (
                    <div style={{ flex: '1' }}>
                        <h2>{isEditing ? "Edit Course" : "Add New Course"}</h2>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group"><label>Course Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} required minLength="3" maxLength="100" /></div>
                            <div className="form-group"><label>Credits</label><input type="number" name="credits" value={formData.credits} onChange={handleChange} required min="1" max="6" /></div>
                            <button type="submit" className="btn">{isEditing ? "Update Course" : "Create Course"}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, title: '', credits: '' }); }} style={{marginTop: '10px', background: 'gray', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Cancel Edit</button>}
                        </form>
                    </div>
                )}

                <div style={{ flex: userRole === 'Admin' ? '2' : '1' }}>
                    <h2>Course List</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'var(--code-bg)' }}>
                        <thead>
                            <tr style={{ background: 'var(--accent)', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Title</th>
                                <th style={{ padding: '12px' }}>Credits</th>
                                {userRole === 'Admin' && <th style={{ padding: '12px' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(c => (
                                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}>{c.id}</td>
                                    <td style={{ padding: '12px' }}>{c.title}</td>
                                    <td style={{ padding: '12px' }}>{c.credits}</td>
                                    {userRole === 'Admin' && (
                                        <td style={{ padding: '12px' }}>
                                            <button onClick={() => handleEdit(c)} style={{ marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold' }}>Edit</button>
                                            <button onClick={() => handleDelete(c.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#d93025', fontWeight: 'bold' }}>Delete</button>
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
export default CoursesPage;