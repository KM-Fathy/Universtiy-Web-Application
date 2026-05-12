import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

function StudentProfilesPage() {
    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({ id: null, address: '', dateOfBirth: '', studentId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const userRole = localStorage.getItem('userRole');

    const fetchProfiles = async () => {
        try { const response = await api.get('/studentprofiles'); setProfiles(response.data); } 
        catch (err) { console.error(err); }
    };

    useEffect(() => { fetchProfiles(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { address: formData.address, dateOfBirth: formData.dateOfBirth, studentId: parseInt(formData.studentId) };
        try {
            if (isEditing) await api.put(`/studentprofiles/${formData.id}`, payload);
            else await api.post('/studentprofiles', payload);
            setFormData({ id: null, address: '', dateOfBirth: '', studentId: '' });
            setIsEditing(false);
            fetchProfiles();
        } catch (err) { alert("Failed to save profile."); }
    };

    const handleEdit = (profile) => { 
        setFormData({ 
            id: profile.id, 
            address: profile.address, 
            dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '', 
            studentId: profile.studentId 
        }); 
        setIsEditing(true); 
    };

    const handleDelete = async (id) => { 
        if (window.confirm("Delete profile?")) { 
            try { await api.delete(`/studentprofiles/${id}`); fetchProfiles(); } 
            catch (err) { console.error(err); } 
        } 
    };

    return (
        <div className="admin-page">
            <Navbar />
            <div className="page-container" style={{ display: 'grid', gridTemplateColumns: userRole === 'Admin' ? '350px 1fr' : '1fr', gap: '40px' }}>
                
                {userRole === 'Admin' && (
                    <aside>
                        <div className="card">
                            <h2 style={{ marginBottom: '24px' }}>{isEditing ? "Edit Bio" : "New Profile"}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Full Address</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="123 University Ave" />
                                </div>
                                <div className="input-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Student ID (Numeric)</label>
                                    <input type="number" name="studentId" value={formData.studentId} onChange={handleChange} required placeholder="17" />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    {isEditing ? "Update Records" : "Link Profile"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, address: '', dateOfBirth: '', studentId: '' }); }} className="btn btn-danger" style={{ width: '100%', marginTop: '12px' }}>
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>
                    </aside>
                )}

                <main>
                    <header style={{ marginBottom: '24px' }}>
                        <h1>Student Profiles</h1>
                        <p>Detailed personal records and identity management</p>
                    </header>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Owner ID</th>
                                    <th>Location</th>
                                    <th>Birth Date</th>
                                    {userRole === 'Admin' && <th style={{ textAlign: 'right' }}>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map(p => (
                                    <tr key={p.id}>
                                        <td><span className="badge">#{p.id}</span></td>
                                        <td><span className="badge active">Student #{p.studentId}</span></td>
                                        <td style={{ color: 'var(--text-main)' }}>{p.address}</td>
                                        <td>{new Date(p.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        {userRole === 'Admin' && (
                                            <td style={{ textAlign: 'right' }}>
                                                <button onClick={() => handleEdit(p)} className="action-btn" style={{ marginRight: '8px' }}>Edit</button>
                                                <button onClick={() => handleDelete(p.id)} className="action-btn" style={{ color: 'var(--danger)' }}>Delete</button>
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
export default StudentProfilesPage;