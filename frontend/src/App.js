import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Rankings from './components/Rankings';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <h1 className="app-title">Points Claiming System</h1>
      <p className="app-small-title">Select users, claim random points, and track rankings!</p>

      <div className="nav-buttons">
        <Link to="/">
          <button className={location.pathname === '/' ? 'nav-btn active' : 'nav-btn'}>Dashboard</button>
        </Link>
        <Link to="/rankings">
          <button className={location.pathname === '/rankings' ? 'nav-btn active' : 'nav-btn'}>Rankings</button>
        </Link>
      </div>

      <hr className="divider" />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rankings" element={<Rankings />} />
      </Routes>
    </div>
  );
}

// Wrap with Router outside to use useLocation inside App
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
