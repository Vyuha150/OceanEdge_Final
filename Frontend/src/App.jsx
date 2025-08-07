import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import Navroutes from './routes/Navroutes';
import WaveLoader from './components/WaveLoader';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add effect to handle route changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Show loader for 3 seconds to allow the animation to complete

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
       <ScrollToTop />
      {loading && <WaveLoader />}
      <Navbar user={user} onLogout={handleLogout} />
      <div className="">
        <Navroutes onLogin={handleLogin} user={user} />
      </div>
    </div>
  );
};

export default App;