import Navbar from '../components/Navbar';

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Welcome to the Dashboard</h1>
                <p>You are successfully logged in. Select a model from the navigation bar to begin managing data.</p>
            </div>
        </div>
    );
}

export default Dashboard;