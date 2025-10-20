import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the JWT token from URL parameters
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const error = params.get('error');
    
    if (accessToken) {
      // Store the token in localStorage
      localStorage.setItem('token', accessToken);
      
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } else if (error) {
      // Handle error
      console.error('Authentication error:', error);
      navigate('/login', { state: { error: 'Authentication failed. Please try again.' } });
    } else {
      // No token or error present
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="auth-callback">
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallback;