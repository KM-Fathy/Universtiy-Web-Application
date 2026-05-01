import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    // We check localStorage to see if the user successfully logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        // If not logged in, kick them back to the login page
        return <Navigate to="/login" replace />;
    }
    
    // If logged in, allow them to view the page
    return children;
}

export default ProtectedRoute;