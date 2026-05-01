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

    const handleEdit = (profile) => { setFormData({ id: profile.id, address: profile.address, dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '', studentId: profile.studentId }); setIsEditing(true); };
    const handleDelete = async (id) => { if (window.confirm("Delete profile?")) { try { await api.delete(`/studentprofiles/${id}`); fetchProfiles(); } catch (err) { console.error(err); } } };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ display: 'flex', gap: '40px' }}>
                {userRole === 'Admin' && (
                    <div style={{ flex: '1' }}>
                        <h2>{isEditing ? "Edit Profile" : "Add New Profile"}</h2>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group"><label>Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} required /></div>
                            <div className="form-group"><label>Date of Birth</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /></div>
                            <div className="form-group"><label>Student ID</label><input type="number" name="studentId" value={formData.studentId} onChange={handleChange} required /></div>
                            <button type="submit" className="btn">{isEditing ? "Update Profile" : "Create Profile"}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, address: '', dateOfBirth: '', studentId: '' }); }} style={{marginTop: '10px', background: 'gray', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Cancel Edit</button>}
                        </form>
                    </div>
                )}

                <div style={{ flex: userRole === 'Admin' ? '2' : '1' }}>
                    <h2>Student Profiles List</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'var(--code-bg)' }}>
                        <thead>
                            <tr style={{ background: 'var(--accent)', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Student ID</th>
                                <th style={{ padding: '12px' }}>Address</th>
                                <th style={{ padding: '12px' }}>Date of Birth</th>
                                {userRole === 'Admin' && <th style={{ padding: '12px' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}>{p.id}</td>
                                    <td style={{ padding: '12px' }}>{p.studentId}</td>
                                    <td style={{ padding: '12px' }}>{p.address}</td>
                                    <td style={{ padding: '12px' }}>{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                                    {userRole === 'Admin' && (
                                        <td style={{ padding: '12px' }}>
                                            <button onClick={() => handleEdit(p)} style={{ marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold' }}>Edit</button>
                                            <button onClick={() => handleDelete(p.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#d93025', fontWeight: 'bold' }}>Delete</button>
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
export default StudentProfilesPage;