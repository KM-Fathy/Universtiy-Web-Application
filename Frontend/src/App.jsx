import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';         
import DepartmentsPage from './pages/DepartmentsPage'; 
import StudentProfilesPage from './pages/StudentProfilesPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; 

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard is the ONLY protected route both roles share */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* ADMIN ONLY ROUTES - Students can no longer access these! */}
            <Route path="/students" element={<AdminRoute><StudentsPage /></AdminRoute>} />
            <Route path="/courses" element={<AdminRoute><CoursesPage /></AdminRoute>} />
            <Route path="/departments" element={<AdminRoute><DepartmentsPage /></AdminRoute>} />
            <Route path="/profiles" element={<AdminRoute><StudentProfilesPage /></AdminRoute>} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;