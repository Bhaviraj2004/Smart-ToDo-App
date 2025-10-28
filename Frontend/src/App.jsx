import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import MainScreen from './components/MainScreen';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  return token ? children : <Navigate to="/" replace />;
};

// Add this new component for authenticated users
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  return !token ? children : <Navigate to="/main" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page - only accessible if NOT logged in */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } 
        />
        
        {/* Login page - only accessible if NOT logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Protected Main page - only accessible if logged in */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;