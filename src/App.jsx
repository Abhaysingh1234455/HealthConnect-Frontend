import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import BodyMetrics from './components/BodyMetrics';
import Health from './components/Health';
import Reports from './components/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginBack from './components/loginBack';
import Appointment from './components/Appointments';
import NewSignup from './components/NewSignup'
import './App.css';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [hospitals, setHospitals] = useState([]);
  const userId = localStorage.getItem("userId");

  // ✅ Ensure auth persists across refresh
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('userId');

    if (auth === 'true' && storedUserId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={isAuthenticated ? (
              <>
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <div className="main-container">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <Home setHospitals={setHospitals}/>
                  </main>
                </div>
              </>
            ) : <Navigate to="/login" />}
          />
          
          <Route path="/login" element={<LoginBack setIsAuthenticated={setIsAuthenticated} />} />

          <Route 
            path="/SignupPage" 
            element={isAuthenticated ? <Navigate to="/home" /> : <NewSignup setIsAuthenticated={setIsAuthenticated} />} 
          />
          
          <Route
            path="/metrics"
            element={isAuthenticated ? (
              <>
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <div className="main-container">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <BodyMetrics userId={userId} />
                  </main>
                </div>
              </>
            ) : <Navigate to="/login" />}
          />
          <Route
            path="/health"
            element={isAuthenticated ? (
              <>
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <div className="main-container">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <Health />
                  </main>
                </div>
              </>
            ) : <Navigate to="/login" />}
          />
          <Route
              path="/Appointments"
              element={isAuthenticated ? (
                <>
                  <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                  <div className="main-container">
                    <Sidebar isOpen={isSidebarOpen} />
                    <main className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                      <Appointment hospitals={hospitals} />
                    </main>
                  </div>
                </>
              ) : <Navigate to="/login" />}
            />
          <Route
            path="/reports"
            element={isAuthenticated ? (
              <>
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <div className="main-container">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <Reports />
                  </main>
                </div>
              </>
            ) : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
