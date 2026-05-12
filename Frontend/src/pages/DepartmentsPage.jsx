import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const userRole = localStorage.getItem('userRole');

    const fetchDepartments = async () => {
        try { 
            const response = await api.get('/departments'); 
            setDepartments(response.data); 
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchDepartments(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) await api.put(`/departments/${formData.id}`, { name: formData.name });
            else await api.post('/departments', { name: formData.name });
            setFormData({ id: null, name: '' });
            setIsEditing(false);
            fetchDepartments();
        } catch (err) { alert("Failed to save department."); }
    };

    const handleEdit = (dept) => { setFormData({ id: dept.id, name: dept.name }); setIsEditing(true); };
    const handleDelete = async (id) => { 
        if (window.confirm("Delete department?")) { 
            try { await api.delete(`/departments/${id}`); fetchDepartments(); } 
            catch (err) { alert("Failed to delete."); } 
        } 
    };

    return (
        <div className="admin-page">
            <Navbar />
            <div className="page-container" style={{ display: 'grid', gridTemplateColumns: userRole === 'Admin' ? '350px 1fr' : '1fr', gap: '40px' }}>
                
                {userRole === 'Admin' && (
                    <aside>
                        <div className="card">
                            <h2 style={{ marginBottom: '24px' }}>{isEditing ? "Update Dept" : "New Dept"}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Department Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Computer Science" />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    {isEditing ? "Apply Changes" : "Create Department"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '' }); }} className="btn btn-danger" style={{ width: '100%', marginTop: '12px' }}>
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>
                    </aside>
                )}

                <main>
                    <header style={{ marginBottom: '24px' }}>
                        <h1>University Departments</h1>
                        <p>Managing {departments.length} institutional divisions</p>
                    </header>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Department Name</th>
                                    {userRole === 'Admin' && <th style={{ textAlign: 'right' }}>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map(d => (
                                    <tr key={d.id}>
                                        <td><span className="badge">#{d.id}</span></td>
                                        <td style={{ fontWeight: '600' }}>{d.name}</td>
                                        {userRole === 'Admin' && (
                                            <td style={{ textAlign: 'right' }}>
                                                <button onClick={() => handleEdit(d)} className="action-btn" style={{ marginRight: '8px' }}>Edit</button>
                                                <button onClick={() => handleDelete(d.id)} className="action-btn" style={{ color: 'var(--danger)' }}>Delete</button>
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
export default DepartmentsPage;