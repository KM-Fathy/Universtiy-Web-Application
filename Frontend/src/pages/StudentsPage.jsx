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

    useEffect(() => { 
        fetchStudents(); 
    }, []);

    // --- NEW: Change Department ---
    // --- Change Department ---
    const handleChangeDepartment = async (student) => {
        const input = window.prompt(`Enter the NEW Department ID for ${student.name}:`);
        if (!input) return; // Stop if they click cancel

        const deptId = parseInt(input);
        if (isNaN(deptId)) {
            alert("Error: You must type a numeric ID.");
            return;
        }

        try {
            // CRITICAL FIX: We must send an empty 'major' string so the C# DTO doesn't reject it!
            await api.put(`/students/${student.id}`, { 
                name: student.name,
                departmentId: deptId 
            });
            alert("Department updated!");
            fetchStudents();
        } catch (err) {
            alert("Failed to update department. Are you sure that Department ID exists?");
        }
    };

    // --- Add Course ---
    const handleAddCourse = async (studentId) => {
        const input = window.prompt("Enter the exact NUMERIC Course ID to ADD (e.g., 1, 2, 3):");
        if (!input) return; 

        const courseId = parseInt(input);
        if (isNaN(courseId)) { alert("Error: You must type a number!"); return; }

        try { 
            await api.post(`/students/${studentId}/courses/${courseId}`); 
            alert("Course added!"); 
            fetchStudents(); 
        } 
        catch (err) { alert("Failed to add course. Make sure the ID exists and they aren't already in it."); }
    };

    // --- NEW: Remove Course ---
    const handleRemoveCourse = async (studentId) => {
        const input = window.prompt("Enter the exact NUMERIC Course ID to REMOVE:");
        if (!input) return; 

        const courseId = parseInt(input);
        if (isNaN(courseId)) { alert("Error: You must type a number!"); return; }

        try { 
            await api.delete(`/students/${studentId}/courses/${courseId}`); 
            alert("Course removed!"); 
            fetchStudents(); 
        } 
        catch (err) { alert("Failed to remove course. Are they actually assigned to it?"); }
    };

    // --- Delete Student ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to completely delete this student account?")) {
            try { await api.delete(`/students/${id}`); fetchStudents(); } 
            catch (err) { console.error(err); }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '20px' }}>
                
                <h2>Student Directory</h2>
                <p style={{ color: 'var(--text)', marginBottom: '20px' }}>
                    {userRole === 'Admin' 
                        ? "Manage student departments and course enrollments below. New students must register via the Register page." 
                        : "View the list of students."}
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--code-bg)' }}>
                    <thead>
                        <tr style={{ background: 'var(--accent)', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>Name</th>
                            <th style={{ padding: '12px' }}>Department</th>
                            <th style={{ padding: '12px' }}>Courses</th>
                            {userRole === 'Admin' && <th style={{ padding: '12px' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px' }}>{s.id}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-h)' }}>{s.name}</td>
                                <td style={{ padding: '12px', color: s.departmentName ? 'inherit' : '#d93025' }}>
                                    {s.departmentName || 'Not Assigned'}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {s.courseTitles && s.courseTitles.length > 0 ? s.courseTitles.join(', ') : 'None'}
                                </td>
                                
                                {userRole === 'Admin' && (
                                    <td style={{ padding: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <button onClick={() => handleChangeDepartment(s)} style={actionBtnStyle('var(--accent)')}>
                                            Dept
                                        </button>
                                        <button onClick={() => handleAddCourse(s.id)} style={actionBtnStyle('green')}>
                                            + Course
                                        </button>
                                        <button onClick={() => handleRemoveCourse(s.id)} style={actionBtnStyle('#fbbc04')}>
                                            - Course
                                        </button>
                                        <button onClick={() => handleDelete(s.id)} style={actionBtnStyle('#d93025')}>
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

// A quick helper to make the buttons look nice without cluttering the HTML
const actionBtnStyle = (color) => ({
    cursor: 'pointer', 
    background: 'none', 
    border: `1px solid ${color}`, 
    color: color, 
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px'
});

export default StudentsPage;