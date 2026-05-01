import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const userRole = localStorage.getItem('userRole');

    const fetchDepartments = async () => {
        try { const response = await api.get('/departments'); setDepartments(response.data); } 
        catch (err) { console.error(err); }
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
    const handleDelete = async (id) => { if (window.confirm("Delete department?")) { try { await api.delete(`/departments/${id}`); fetchDepartments(); } catch (err) { alert("Failed to delete."); } } };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ display: 'flex', gap: '40px' }}>
                {userRole === 'Admin' && (
                    <div style={{ flex: '1' }}>
                        <h2>{isEditing ? "Edit Department" : "Add New Department"}</h2>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group"><label>Department Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required minLength="2" maxLength="100" /></div>
                            <button type="submit" className="btn">{isEditing ? "Update Department" : "Create Department"}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '' }); }} style={{marginTop: '10px', background: 'gray', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Cancel Edit</button>}
                        </form>
                    </div>
                )}

                <div style={{ flex: userRole === 'Admin' ? '2' : '1' }}>
                    <h2>Department List</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'var(--code-bg)' }}>
                        <thead>
                            <tr style={{ background: 'var(--accent)', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Name</th>
                                {userRole === 'Admin' && <th style={{ padding: '12px' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(d => (
                                <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}>{d.id}</td>
                                    <td style={{ padding: '12px' }}>{d.name}</td>
                                    {userRole === 'Admin' && (
                                        <td style={{ padding: '12px' }}>
                                            <button onClick={() => handleEdit(d)} style={{ marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold' }}>Edit</button>
                                            <button onClick={() => handleDelete(d.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#d93025', fontWeight: 'bold' }}>Delete</button>
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
export default DepartmentsPage;