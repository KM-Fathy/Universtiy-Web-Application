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
        <div className="admin-page">
            <Navbar />
            <div className="page-container" style={{ display: 'grid', gridTemplateColumns: userRole === 'Admin' ? '350px 1fr' : '1fr', gap: '40px' }}>
                
                {userRole === 'Admin' && (
                    <aside>
                        <div className="card">
                            <h2 style={{ marginBottom: '24px' }}>{isEditing ? "Edit Course" : "New Course"}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Course Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Advanced Calculus" />
                                </div>
                                <div className="input-group">
                                    <label>Credit Hours</label>
                                    <input type="number" name="credits" value={formData.credits} onChange={handleChange} required min="1" max="6" placeholder="3" />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    {isEditing ? "Update Course" : "Create Course"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, title: '', credits: '' }); }} className="btn btn-danger" style={{ width: '100%', marginTop: '12px' }}>
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>
                    </aside>
                )}

                <main>
                    <header style={{ marginBottom: '24px' }}>
                        <h1>Academic Catalog</h1>
                        <p>Browsing {courses.length} available higher-education modules</p>
                    </header>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Weight</th>
                                    {userRole === 'Admin' && <th style={{ textAlign: 'right' }}>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(c => (
                                    <tr key={c.id}>
                                        <td><span className="badge">#{c.id}</span></td>
                                        <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{c.title}</td>
                                        <td><span className="badge active">{c.credits} Credits</span></td>
                                        {userRole === 'Admin' && (
                                            <td style={{ textAlign: 'right' }}>
                                                <button onClick={() => handleEdit(c)} className="action-btn" style={{ marginRight: '8px' }}>Edit</button>
                                                <button onClick={() => handleDelete(c.id)} className="action-btn" style={{ color: 'var(--danger)' }}>Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default CoursesPage;