import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');

    // 1. If they aren't logged in at all, kick them to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // 2. If they are logged in, but NOT an Admin, kick them to the Dashboard
    if (userRole !== 'Admin') {
        return <Navigate to="/" replace />; 
    }
    
    // 3. If they are an Admin, let them view the page
    return children;
}

export default AdminRoute;