import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';         
import DepartmentsPage from './pages/DepartmentsPage'; 
import StudentProfilesPage from './pages/StudentProfilesPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; // <-- Import your new Admin Gatekeeper

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Regular Protected Routes (Accessible by both Users and Admins) */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>} />
            
            {/* ADMIN ONLY ROUTE */}
            <Route path="/profiles" element={<AdminRoute><StudentProfilesPage /></AdminRoute>} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;